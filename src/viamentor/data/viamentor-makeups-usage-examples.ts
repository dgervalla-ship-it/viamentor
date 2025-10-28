/**
 * VIAMENTOR - Makeups Usage Examples
 * Exemples d'utilisation pratiques
 */

/**
 * ============================================================================
 * EXEMPLE 1: Configuration règles catégorie B
 * ============================================================================
 */

export const EXAMPLE_1_CONFIG_CATEGORY_B = `
// Configuration stricte pour catégorie B
const categoryBConfig = {
  category: "B",
  maxDaysFromCancellation: 30,
  expiryDays: 30,
  validReasons: [
    "illness_with_certificate",
    "family_emergency",
    "dangerous_weather"
  ],
  requiresAdminValidation: true, // Validation requise
  autoNotifyStudent: true,
  sendReminders: true,
  reminderDays: [7, 3, 1],
  minBookingHoursAdvance: 48, // 48h d'avance
  allowMultipleMakeups: false // Max 1 crédit à la fois
};

// Sauvegarder via API
await fetch('/api/makeups/config', {
  method: 'POST',
  body: JSON.stringify(categoryBConfig)
});
`;

/**
 * ============================================================================
 * EXEMPLE 2: Webhook handler annulation leçon
 * ============================================================================
 */

export const EXAMPLE_2_WEBHOOK_HANDLER = `
// lib/webhooks/lesson-canceled.handler.ts

import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { generateBookingToken } from '@/lib/tokens';

export async function handleLessonCanceled(event: LessonCanceledEvent) {
  const { lessonId, studentId, reason, canceledAt } = event;

  // 1. Récupérer config tenant
  const config = await prisma.makeupConfig.findFirst({
    where: {
      tenantId: event.tenantId,
      OR: [
        { category: event.category },
        { category: 'all' }
      ]
    }
  });

  if (!config) return;

  // 2. Vérifier raison valide
  if (!config.validReasons.includes(reason)) {
    console.log('Reason not valid for makeup:', reason);
    return;
  }

  // 3. Créer crédit rattrapage
  const expiresAt = new Date(canceledAt);
  expiresAt.setDate(expiresAt.getDate() + config.expiryDays);

  const makeup = await prisma.makeupCredit.create({
    data: {
      studentId,
      lessonId,
      category: event.category,
      reason,
      reasonDetails: event.reasonDetails,
      status: config.requiresAdminValidation ? 'pending' : 'available',
      expiresAt,
      notified: false
    }
  });

  // 4. Envoyer notification si activée
  if (config.autoNotifyStudent && !config.requiresAdminValidation) {
    const bookingToken = generateBookingToken(makeup.id);
    const bookingLink = \`https://app.viamentor.ch/student/makeups/book?token=\${bookingToken}\`;

    await sendEmail({
      to: event.studentEmail,
      template: 'makeup-available',
      variables: {
        studentName: event.studentName,
        lessonDate: event.lessonDate,
        reason: translateReason(reason, event.locale),
        expiryDate: expiresAt.toLocaleDateString(event.locale),
        bookingLink,
        schoolName: event.schoolName
      }
    });

    await prisma.makeupCredit.update({
      where: { id: makeup.id },
      data: {
        notified: true,
        notifiedAt: new Date()
      }
    });
  }

  // 5. Log audit trail
  await prisma.auditLog.create({
    data: {
      action: 'makeup_created',
      entityType: 'makeup',
      entityId: makeup.id,
      userId: event.canceledBy,
      metadata: { reason, lessonId }
    }
  });
}
`;

/**
 * ============================================================================
 * EXEMPLE 3: Cron job reminders
 * ============================================================================
 */

export const EXAMPLE_3_CRON_REMINDERS = `
// lib/jobs/makeups-reminders.cron.ts

import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { Queue } from 'bullmq';

const emailQueue = new Queue('emails');

export async function sendMakeupsReminders() {
  const now = new Date();

  // Rappel J-7
  const reminder7Days = new Date(now);
  reminder7Days.setDate(reminder7Days.getDate() + 7);

  const makeups7Days = await prisma.makeupCredit.findMany({
    where: {
      status: 'available',
      expiresAt: {
        gte: reminder7Days,
        lt: new Date(reminder7Days.getTime() + 24 * 60 * 60 * 1000)
      },
      remindersSent: {
        not: {
          has: 'day_7'
        }
      }
    },
    include: {
      student: true,
      lesson: true
    }
  });

  for (const makeup of makeups7Days) {
    await emailQueue.add('send-reminder', {
      to: makeup.student.email,
      template: 'makeup-reminder-7',
      variables: {
        studentName: makeup.student.name,
        expiryDate: makeup.expiresAt.toLocaleDateString(),
        daysRemaining: 7,
        bookingLink: generateBookingLink(makeup.id)
      }
    });

    await prisma.makeupCredit.update({
      where: { id: makeup.id },
      data: {
        remindersSent: {
          push: 'day_7'
        }
      }
    });
  }

  // Similar logic for J-3 and J-1...
}

// Schedule cron job (run daily at midnight UTC)
cron.schedule('0 0 * * *', sendMakeupsReminders);
`;

/**
 * ============================================================================
 * EXEMPLE 4: Template email personnalisé
 * ============================================================================
 */

export const EXAMPLE_4_CUSTOM_TEMPLATE = `
// Template "Rattrapage disponible" personnalisé

const customTemplate = {
  type: 'available',
  language: 'fr',
  subject: '🎓 Crédit rattrapage disponible - {studentName}',
  body: \`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Crédit Rattrapage Disponible</h1>
      </div>
      
      <div style="padding: 30px; background: #f9fafb;">
        <p>Bonjour <strong>{studentName}</strong>,</p>
        
        <p>Suite à l'annulation de votre leçon du <strong>{lessonDate}</strong> pour raison de <em>{reason}</em>, 
        nous avons le plaisir de vous informer qu'un crédit rattrapage a été créé sur votre compte.</p>
        
        <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0;">
          <p style="margin: 0;"><strong>📅 Validité:</strong> Jusqu'au {expiryDate}</p>
          <p style="margin: 10px 0 0 0;"><strong>⏰ Jours restants:</strong> {daysRemaining}</p>
        </div>
        
        <p>Réservez votre leçon de rattrapage dès maintenant en cliquant sur le bouton ci-dessous :</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{bookingLink}" style="background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            Réserver ma leçon
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          💡 <strong>Astuce:</strong> Réservez rapidement pour obtenir les meilleurs créneaux horaires !
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 12px;">
          Cordialement,<br>
          <strong>{schoolName}</strong><br>
          📞 {schoolPhone} | ✉️ {schoolEmail}
        </p>
      </div>
    </div>
  \`,
  active: true
};

// Sauvegarder via API
await fetch('/api/makeups/templates', {
  method: 'POST',
  body: JSON.stringify(customTemplate)
});
`;

/**
 * ============================================================================
 * EXEMPLE 5: Analytics query
 * ============================================================================
 */

export const EXAMPLE_5_ANALYTICS_QUERY = `
// Récupérer analytics rattrapages

async function getMakeupsAnalytics(tenantId: string, period: string) {
  const { start, end } = getPeriodDates(period);

  // Stats globales
  const stats = await prisma.makeupCredit.groupBy({
    by: ['status'],
    where: {
      tenantId,
      createdAt: { gte: start, lte: end }
    },
    _count: true
  });

  const creditsCreated = stats.reduce((sum, s) => sum + s._count, 0);
  const creditsUsed = stats.find(s => s.status === 'used')?._count || 0;
  const creditsExpired = stats.find(s => s.status === 'expired')?._count || 0;

  // Délai moyen utilisation
  const usedMakeups = await prisma.makeupCredit.findMany({
    where: {
      tenantId,
      status: 'used',
      createdAt: { gte: start, lte: end }
    },
    select: {
      createdAt: true,
      usedAt: true
    }
  });

  const avgDaysToUse = usedMakeups.reduce((sum, m) => {
    const days = (m.usedAt!.getTime() - m.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return sum + days;
  }, 0) / usedMakeups.length;

  // Par raison
  const byReason = await prisma.makeupCredit.groupBy({
    by: ['reason'],
    where: {
      tenantId,
      createdAt: { gte: start, lte: end }
    },
    _count: true
  });

  return {
    stats: {
      creditsCreated,
      creditsUsed,
      creditsExpired,
      usageRate: (creditsUsed / creditsCreated) * 100,
      expiryRate: (creditsExpired / creditsCreated) * 100,
      avgDaysToUse
    },
    byReason: byReason.map(r => ({
      reason: r.reason,
      count: r._count,
      percentage: (r._count / creditsCreated) * 100
    }))
  };
}
`;

/**
 * ============================================================================
 * EXEMPLE 6: Validation admin workflow
 * ============================================================================
 */

export const EXAMPLE_6_ADMIN_VALIDATION = `
// Valider crédit rattrapage (admin)

async function validateMakeup(makeupId: string, approved: boolean, adminId: string, notes?: string) {
  const makeup = await prisma.makeupCredit.findUnique({
    where: { id: makeupId },
    include: { student: true }
  });

  if (!makeup || makeup.status !== 'pending') {
    throw new Error('Makeup not found or not pending');
  }

  if (approved) {
    // Approuver
    await prisma.makeupCredit.update({
      where: { id: makeupId },
      data: {
        status: 'available',
        validatedBy: adminId,
        validatedAt: new Date()
      }
    });

    // Envoyer notification élève
    const bookingToken = generateBookingToken(makeupId);
    await sendEmail({
      to: makeup.student.email,
      template: 'makeup-available',
      variables: {
        studentName: makeup.student.name,
        expiryDate: makeup.expiresAt.toLocaleDateString(),
        bookingLink: \`https://app.viamentor.ch/student/makeups/book?token=\${bookingToken}\`
      }
    });
  } else {
    // Rejeter
    await prisma.makeupCredit.update({
      where: { id: makeupId },
      data: {
        status: 'cancelled',
        cancelledBy: adminId,
        cancelledAt: new Date(),
        cancelReason: notes
      }
    });

    // Envoyer email explication
    await sendEmail({
      to: makeup.student.email,
      template: 'makeup-rejected',
      variables: {
        studentName: makeup.student.name,
        reason: notes || 'Raison non spécifiée'
      }
    });
  }
}
`;

/**
 * ============================================================================
 * EXEMPLE 7: Réservation avec crédit rattrapage
 * ============================================================================
 */

export const EXAMPLE_7_BOOKING_WITH_MAKEUP = `
// Réserver leçon avec crédit rattrapage

async function bookLessonWithMakeup(data: {
  makeupId: string;
  instructorId: string;
  vehicleId: string;
  startDate: Date;
  duration: number;
}) {
  // 1. Vérifier crédit valide
  const makeup = await prisma.makeupCredit.findUnique({
    where: { id: data.makeupId }
  });

  if (!makeup || makeup.status !== 'available') {
    throw new Error('Makeup credit not available');
  }

  if (makeup.expiresAt < new Date()) {
    throw new Error('Makeup credit expired');
  }

  // 2. Vérifier disponibilité
  const isAvailable = await checkAvailability({
    instructorId: data.instructorId,
    vehicleId: data.vehicleId,
    startDate: data.startDate,
    duration: data.duration
  });

  if (!isAvailable) {
    throw new Error('Slot not available');
  }

  // 3. Créer leçon
  const lesson = await prisma.lesson.create({
    data: {
      studentId: makeup.studentId,
      instructorId: data.instructorId,
      vehicleId: data.vehicleId,
      category: makeup.category,
      type: 'practical',
      status: 'scheduled',
      startDate: data.startDate,
      duration: data.duration,
      price: 0, // Gratuit car rattrapage
      isPaid: true,
      notes: 'Leçon de rattrapage'
    }
  });

  // 4. Marquer crédit utilisé
  await prisma.makeupCredit.update({
    where: { id: data.makeupId },
    data: {
      status: 'used',
      usedAt: new Date(),
      usedLessonId: lesson.id
    }
  });

  // 5. Envoyer confirmation
  await sendEmail({
    to: makeup.student.email,
    template: 'lesson-confirmed',
    variables: {
      lessonDate: data.startDate.toLocaleDateString(),
      instructorName: data.instructorName,
      vehiclePlate: data.vehiclePlate
    }
  });

  return lesson;
}
`;

/**
 * ============================================================================
 * EXEMPLE 8: Test envoi email
 * ============================================================================
 */

export const EXAMPLE_8_TEST_EMAIL = `
// Tester envoi email template

async function testEmailTemplate(templateId: string, testEmail: string) {
  const template = await prisma.makeupEmailTemplate.findUnique({
    where: { id: templateId }
  });

  if (!template) {
    throw new Error('Template not found');
  }

  // Variables de test
  const testVariables = {
    studentName: 'Sophie Martin',
    lessonDate: '15 janvier 2025',
    reason: 'maladie avec certificat',
    expiryDate: '14 février 2025',
    daysRemaining: '7',
    bookingLink: 'https://app.viamentor.ch/student/makeups/book?token=test123',
    schoolName: 'Auto-École Genève',
    schoolPhone: '+41 22 123 45 67',
    schoolEmail: 'contact@autoecole.ch'
  };

  // Remplacer variables
  let subject = template.subject;
  let body = template.body;

  Object.entries(testVariables).forEach(([key, value]) => {
    const regex = new RegExp(\`{$\{key}}\`, 'g');
    subject = subject.replace(regex, value);
    body = body.replace(regex, value);
  });

  // Envoyer email test
  await sendEmail({
    to: testEmail,
    subject: \`[TEST] \${subject}\`,
    html: body
  });

  return { success: true };
}
`;

/**
 * Export all examples
 */
export const MAKEUPS_USAGE_EXAMPLES = {
  config: EXAMPLE_1_CONFIG_CATEGORY_B,
  webhook: EXAMPLE_2_WEBHOOK_HANDLER,
  cron: EXAMPLE_3_CRON_REMINDERS,
  template: EXAMPLE_4_CUSTOM_TEMPLATE,
  analytics: EXAMPLE_5_ANALYTICS_QUERY,
  validation: EXAMPLE_6_ADMIN_VALIDATION,
  booking: EXAMPLE_7_BOOKING_WITH_MAKEUP,
  test: EXAMPLE_8_TEST_EMAIL,
};
