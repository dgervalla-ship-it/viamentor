/**
 * VIAMENTOR - ARCHITECTURE PARTIE 3/6
 * API Routes et Server Actions
 */

// ============================================================================
// SERVER ACTIONS (Recommandé pour mutations)
// ============================================================================

export const SERVER_ACTION_EXAMPLE = `
// actions/students/create-student.ts
'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
})

export async function createStudent(formData: FormData) {
  try {
    const data = schema.parse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
    })

    const student = await prisma.student.create({ data })
    revalidatePath('/students')
    
    return { success: true, data: student }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
`;

// ============================================================================
// API ROUTES (Pour webhooks, cron, external APIs)
// ============================================================================

export const API_ROUTE_EXAMPLE = `
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle payment
        break
      case 'customer.subscription.updated':
        // Handle subscription
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
`;

export const STRUCTURE = {
  serverActions: {
    location: "src/actions/",
    usage: "Mutations (create, update, delete)",
    benefits: [
      "Pas besoin d'API routes",
      "Type-safe",
      "Automatic serialization",
      "Progressive enhancement",
    ],
  },
  apiRoutes: {
    location: "src/app/api/",
    usage: "Webhooks, cron jobs, external APIs",
    examples: [
      "Stripe webhooks",
      "Supabase webhooks",
      "Cron jobs",
      "OAuth callbacks",
    ],
  },
};

export default { SERVER_ACTION_EXAMPLE, API_ROUTE_EXAMPLE, STRUCTURE };
