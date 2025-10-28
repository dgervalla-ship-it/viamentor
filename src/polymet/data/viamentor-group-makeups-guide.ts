/**
 * VIAMENTOR - Guide Cours Collectifs Rattrapages
 * Documentation complète de la fonctionnalité
 */

# Guide des Cours Collectifs de Rattrapage

## Vue d'ensemble

La fonctionnalité **Cours Collectifs de Rattrapage** permet aux moniteurs de regrouper plusieurs élèves ayant des rattrapages disponibles dans un cours théorique collectif. Cette approche optimise le temps du moniteur, réduit les coûts pour les élèves et améliore l'utilisation des salles.

## Avantages

### Pour le Moniteur
- ✅ **Optimisation du temps** : Enseigner à plusieurs élèves simultanément
- ✅ **Meilleure planification** : Regrouper les rattrapages en sessions dédiées
- ✅ **Flexibilité** : Proposer des créneaux adaptés à plusieurs élèves

### Pour les Élèves
- ✅ **Économies** : Cours collectif moins cher qu'une leçon individuelle
- ✅ **Apprentissage social** : Bénéficier des questions des autres élèves
- ✅ **Flexibilité** : Accepter ou refuser selon disponibilité

### Pour l'École
- ✅ **Utilisation optimale des salles** : Maximiser l'occupation
- ✅ **Réduction du gaspillage** : Moins de rattrapages expirés
- ✅ **Satisfaction client** : Plus d'options pour les élèves

## Workflow Complet

### 1. Proposition du Cours (Moniteur)

Le moniteur accède à la page **Rattrapages Élèves** (`/instructor/makeups`) et :

1. Consulte la liste des élèves avec rattrapages disponibles
2. Clique sur **"Proposer un cours collectif"**
3. Remplit le formulaire :
   - **Sélection des élèves** : Minimum 2, maximum = capacité de la salle
   - **Date et horaires** : Date future, avant expiration des rattrapages
   - **Salle** : Sélection avec capacité affichée
   - **Thème du cours** : Ex: "Théorie circulation Cat. B"
   - **Description** : Contenu et objectifs du cours
   - **Catégorie** : B, A, A1, C, D...
   - **Notifications** : Option d'envoyer email + SMS aux élèves

### 2. Notification des Élèves

Lorsque le moniteur confirme la proposition :

- ✉️ **Email** envoyé à chaque élève sélectionné
- 📱 **SMS** envoyé (si option activée)
- 🔔 **Notification** dans l'interface élève

Le message contient :
- Détails du cours (date, heure, salle, thème)
- Nom du moniteur
- Boutons **Accepter** / **Refuser**
- Date limite de réponse

### 3. Réponses des Élèves

Chaque élève peut :

- ✅ **Accepter** : Son rattrapage est marqué comme "booked" pour ce cours
- ❌ **Refuser** : Son rattrapage reste disponible
- ⏳ **Ne pas répondre** : Statut "pending" jusqu'à la date limite

### 4. Suivi par le Moniteur

Le moniteur voit dans la section **"Cours Collectifs Planifiés"** :

- 📊 **Statistiques** : Nombre d'acceptations, refus, en attente
- 👥 **Liste des participants** avec statut de chaque élève
- 🔔 **Actions** :
  - **Relancer** : Envoyer un rappel aux élèves "pending"
  - **Annuler** : Annuler le cours (notifie tous les participants)
  - **Voir détails** : Afficher toutes les informations

### 5. Confirmation du Cours

Le cours est **confirmé** lorsque :
- Au moins 2 élèves ont accepté
- La date approche (ex: 48h avant)

Le statut passe de "Planifié" à "Confirmé".

### 6. Déroulement du Cours

Le jour du cours :
- Les élèves présents signent la feuille de présence
- Le moniteur valide les présences dans le système
- Les rattrapages des élèves présents sont marqués comme "utilisés"
- Les absents conservent leur rattrapage disponible

## Contraintes et Règles

### Sélection des Élèves
- ✅ Minimum **2 élèves** requis
- ✅ Maximum = **capacité de la salle**
- ✅ Tous doivent avoir **au moins 1 rattrapage disponible**
- ⚠️ Recommandé : Même **catégorie de permis**

### Planification
- ✅ Date **future** uniquement
- ✅ Date **avant expiration** des rattrapages de tous les élèves
- ✅ Salle **disponible** au créneau choisi
- ✅ Moniteur **disponible** au créneau choisi

### Annulation
- ✅ Possible **jusqu'à 24h avant** le cours
- ✅ Tous les participants sont **notifiés**
- ✅ Les rattrapages redeviennent **disponibles**

## Intégration avec les Cours Théoriques

Les cours collectifs de rattrapage sont **connectés** au système de cours théoriques existant :

### Données Partagées
- **Salles** : Utilise les salles configurées dans `/rooms`
- **Catégories** : Utilise les catégories de permis du système
- **Calendrier** : Visible dans le planning global `/planning`

### Types de Cours
Les cours collectifs peuvent être de type :
- **Théorie** : Cours théorique standard
- **Sensibilisation** : Cours sensibilisation 8h (OAC Art. 10)
- **Premiers secours** : Formation premiers secours

### Capacités des Salles
Exemples de salles disponibles :
- **Salle 1** : 15 places
- **Salle 2** : 12 places
- **Salle 3** : 20 places
- **Salle 4** : 10 places

## Interface Utilisateur

### Page Moniteur (`/instructor/makeups`)

#### Section 1 : Stats Globales
- Rattrapages disponibles
- Rattrapages expirés ce mois
- Rattrapages utilisés
- Taux d'utilisation

#### Section 2 : Action Cours Collectif
- Bouton **"Proposer un cours collectif"**
- Description de la fonctionnalité
- Désactivé si < 2 élèves avec rattrapages

#### Section 3 : Table Élèves
- Liste des élèves avec rattrapages
- Colonnes : Nom, Disponibles, Expire dans, Utilisés, Taux
- Actions : Voir détails, Prolonger, Annuler

#### Section 4 : Cours Collectifs Planifiés
- Cards pour chaque cours planifié
- Infos : Date, heure, salle, thème, catégorie
- Stats : Acceptés, En attente, Refusés
- Liste des participants avec statuts
- Actions : Relancer, Annuler, Voir détails

## API Endpoints (À implémenter)

```typescript
// Proposer un cours collectif
POST /api/instructor/makeups/group-courses
Body: {
  studentIds: string[];
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  topic: string;
  description: string;
  category: string;
  maxParticipants: number;
  notifyStudents: boolean;
}

// Lister les cours collectifs du moniteur
GET /api/instructor/makeups/group-courses

// Annuler un cours collectif
DELETE /api/instructor/makeups/group-courses/:id

// Relancer les participants
POST /api/instructor/makeups/group-courses/:id/remind

// Réponse élève (accepter/refuser)
POST /api/student/makeups/group-courses/:id/respond
Body: {
  response: "accepted" | "declined";
}
```

## Base de Données (Schema Prisma)

```prisma
model GroupMakeupCourse {
  id              String   @id @default(cuid())
  topic           String
  description     String?
  date            DateTime
  startTime       String
  endTime         String
  room            String
  category        String
  instructorId    String
  instructor      User     @relation(fields: [instructorId], references: [id])
  maxParticipants Int
  status          GroupMakeupStatus @default(SCHEDULED)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  participants    GroupMakeupParticipant[]
}

model GroupMakeupParticipant {
  id              String   @id @default(cuid())
  courseId        String
  course          GroupMakeupCourse @relation(fields: [courseId], references: [id])
  studentId       String
  student         User     @relation(fields: [studentId], references: [id])
  makeupCreditId  String
  makeupCredit    MakeupCredit @relation(fields: [makeupCreditId], references: [id])
  status          ParticipantStatus @default(PENDING)
  respondedAt     DateTime?
  createdAt       DateTime @default(now())
  
  @@unique([courseId, studentId])
}

enum GroupMakeupStatus {
  SCHEDULED
  CONFIRMED
  COMPLETED
  CANCELED
}

enum ParticipantStatus {
  PENDING
  ACCEPTED
  DECLINED
}
```

## Notifications

### Email Template (Invitation)

```
Objet : Invitation - Cours collectif de rattrapage

Bonjour [Prénom],

Votre moniteur [Nom Moniteur] vous propose de participer à un cours théorique 
collectif pour utiliser votre rattrapage disponible :

📚 Thème : [Thème du cours]
📅 Date : [Date complète]
🕐 Horaire : [Heure début] - [Heure fin]
📍 Lieu : [Salle]
👥 Participants : [Nombre] élèves

Ce cours vous permettra d'utiliser 1 de vos [X] rattrapages disponibles.

[Bouton ACCEPTER]  [Bouton REFUSER]

Merci de répondre avant le [Date limite].

Cordialement,
L'équipe [École]
```

### SMS Template

```
[École] - Cours collectif rattrapage proposé le [Date] à [Heure]. 
Répondez sur votre espace élève. Expire le [Date limite].
```

## Bonnes Pratiques

### Pour les Moniteurs

1. **Grouper par niveau** : Regrouper des élèves de niveau similaire
2. **Thème adapté** : Choisir un thème pertinent pour tous
3. **Anticiper** : Proposer le cours au moins 1 semaine à l'avance
4. **Relancer** : Envoyer des rappels aux élèves "pending"
5. **Confirmer** : Confirmer le cours dès que 2+ élèves acceptent

### Pour les Élèves

1. **Répondre rapidement** : Ne pas attendre la date limite
2. **Vérifier disponibilité** : S'assurer d'être disponible
3. **Être présent** : Respecter son engagement si accepté
4. **Prévenir** : Annuler si empêchement (au moins 24h avant)

## Métriques et Analytics

### KPIs à suivre
- **Taux de proposition** : % moniteurs utilisant la fonctionnalité
- **Taux d'acceptation** : % élèves acceptant les invitations
- **Taux de présence** : % élèves présents aux cours confirmés
- **Économie de temps** : Heures économisées vs leçons individuelles
- **Réduction expiration** : % rattrapages sauvés de l'expiration

### Rapports
- Nombre de cours collectifs par mois
- Taille moyenne des groupes
- Thèmes les plus demandés
- Salles les plus utilisées

## Support et Aide

### FAQ

**Q: Puis-je proposer un cours avec 1 seul élève ?**
R: Non, minimum 2 élèves requis pour un cours collectif.

**Q: Que se passe-t-il si tous les élèves refusent ?**
R: Le cours est automatiquement annulé et vous êtes notifié.

**Q: Puis-je modifier un cours après l'avoir proposé ?**
R: Non, vous devez l'annuler et en créer un nouveau.

**Q: Les élèves peuvent-ils proposer des cours collectifs ?**
R: Non, seuls les moniteurs peuvent proposer des cours collectifs.

**Q: Le cours compte-t-il comme une leçon pratique ?**
R: Non, c'est un cours théorique qui utilise un crédit de rattrapage.

## Évolutions Futures

### Phase 2
- [ ] Permettre aux élèves de suggérer des créneaux
- [ ] Système de vote pour choisir le meilleur créneau
- [ ] Cours collectifs récurrents (séries)
- [ ] Intégration avec système de paiement
- [ ] Certificats de participation automatiques

### Phase 3
- [ ] Cours collectifs inter-écoles
- [ ] Marketplace de cours collectifs
- [ ] Notation et avis sur les cours
- [ ] Replay vidéo des cours
- [ ] Quiz en ligne post-cours

## Conclusion

Les cours collectifs de rattrapage sont une fonctionnalité puissante qui bénéficie à tous :
- **Moniteurs** : Optimisation du temps
- **Élèves** : Économies et flexibilité
- **Écoles** : Meilleure utilisation des ressources

Pour toute question ou suggestion, contactez le support technique.
