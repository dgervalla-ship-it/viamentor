/**
 * ============================================================================
 * VIAMENTOR - CONTRIBUTING.md
 * ============================================================================
 *
 * Guide de contribution ViaMenutor
 *
 * @version 1.0.0
 * @date 2025-01-19
 */

export const CONTRIBUTING_MD = `
# 🤝 Contributing Guide ViaMenutor

Merci de votre intérêt pour contribuer à ViaMenutor ! Ce guide vous aidera à démarrer.

## Table des matières

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

---

## 1. Code of Conduct

### 1.1 Notre engagement

Nous nous engageons à créer un environnement accueillant et inclusif pour tous.

### 1.2 Standards

**Comportements encouragés:**
- ✅ Utiliser un langage accueillant et inclusif
- ✅ Respecter les points de vue différents
- ✅ Accepter les critiques constructives
- ✅ Se concentrer sur ce qui est meilleur pour la communauté

**Comportements inacceptables:**
- ❌ Langage ou images sexualisés
- ❌ Trolling, insultes ou commentaires dégradants
- ❌ Harcèlement public ou privé
- ❌ Publication d'informations privées sans permission

---

## 2. Getting Started

### 2.1 Prérequis

\`\`\`bash
# Node.js 20+
node --version

# pnpm 9+
pnpm --version

# Git
git --version
\`\`\`

### 2.2 Fork & Clone

\`\`\`bash
# 1. Fork le repository sur GitHub
# 2. Clone votre fork
git clone https://github.com/YOUR_USERNAME/viamentor.git
cd viamentor

# 3. Ajouter upstream remote
git remote add upstream https://github.com/viamentor/viamentor.git

# 4. Installer les dépendances
pnpm install
\`\`\`

### 2.3 Configuration

\`\`\`bash
# Copier .env.example
cp .env.example .env.local

# Éditer .env.local avec vos credentials
\`\`\`

### 2.4 Lancer le projet

\`\`\`bash
# Development server
pnpm dev

# Ouvrir http://localhost:5173
\`\`\`

---

## 3. Development Workflow

### 3.1 Créer une branche

\`\`\`bash
# Sync avec upstream
git checkout develop
git pull upstream develop

# Créer une branche feature
git checkout -b feature/my-feature

# Ou une branche fix
git checkout -b fix/my-fix
\`\`\`

### 3.2 Faire des changements

\`\`\`bash
# 1. Coder
# 2. Tester localement
pnpm dev

# 3. Linter
pnpm lint

# 4. Tests
pnpm test

# 5. Build
pnpm build
\`\`\`

### 3.3 Commit

\`\`\`bash
# Stage changes
git add .

# Commit avec message conventionnel
git commit -m "feat: add student search feature"
\`\`\`

### 3.4 Push & PR

\`\`\`bash
# Push vers votre fork
git push origin feature/my-feature

# Créer une Pull Request sur GitHub
\`\`\`

---

## 4. Coding Standards

### 4.1 TypeScript

\`\`\`typescript
// ✅ Bon: Types explicites
interface Student {
  id: string
  firstName: string
  lastName: string
}

function getStudent(id: string): Student {
  // ...
}

// ❌ Mauvais: any
function getStudent(id: any): any {
  // ...
}
\`\`\`

### 4.2 React Components

\`\`\`typescript
// ✅ Bon: Function component avec types
interface StudentCardProps {
  student: Student
  onEdit: (id: string) => void
}

export function StudentCard({ student, onEdit }: StudentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.firstName} {student.lastName}</CardTitle>
      </CardHeader>
    </Card>
  )
}

// ❌ Mauvais: Sans types
export function StudentCard({ student, onEdit }) {
  // ...
}
\`\`\`

### 4.3 Naming Conventions

\`\`\`typescript
// Components: PascalCase
export function StudentCard() {}

// Functions: camelCase
function fetchStudents() {}

// Constants: UPPER_SNAKE_CASE
const MAX_STUDENTS = 100

// Types/Interfaces: PascalCase
interface Student {}
type StudentStatus = "active" | "inactive"

// Files: kebab-case
// viamentor-students-page.tsx
// viamentor-students-data.tsx
\`\`\`

### 4.4 File Structure

\`\`\`typescript
// ✅ Bon: Imports organisés
// 1. External libraries
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

// 2. Internal components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// 3. Local imports
import { fetchStudents } from "./api"
import type { Student } from "./types"

// 4. Styles (si nécessaire)
import "./styles.css"
\`\`\`

### 4.5 Comments

\`\`\`typescript
// ✅ Bon: JSDoc pour fonctions publiques
/**
 * Fetch students with filters
 * 
 * @param filters - Optional filters
 * @returns Promise with students array
 * 
 * @example
 * const students = await fetchStudents({ status: 'active' })
 */
export async function fetchStudents(filters?: StudentsFilters): Promise<Student[]> {
  // Implementation
}

// ✅ Bon: Comments pour logique complexe
// Calculate progression percentage based on completed lessons
const percentage = (completedLessons / totalLessons) * 100

// ❌ Mauvais: Comments évidents
// Set name to firstName
const name = firstName
\`\`\`

---

## 5. Commit Guidelines

### 5.1 Conventional Commits

Format: \`<type>(<scope>): <subject>\`

**Types:**
- \`feat\`: Nouvelle fonctionnalité
- \`fix\`: Correction de bug
- \`docs\`: Documentation
- \`style\`: Formatage (pas de changement de code)
- \`refactor\`: Refactoring
- \`test\`: Ajout/modification de tests
- \`chore\`: Tâches de maintenance

**Exemples:**

\`\`\`bash
# Feature
git commit -m "feat(students): add search by email"

# Fix
git commit -m "fix(invoices): correct VAT calculation"

# Docs
git commit -m "docs(api): update authentication section"

# Refactor
git commit -m "refactor(students): extract table component"

# Breaking change
git commit -m "feat(auth)!: migrate to new auth system

BREAKING CHANGE: Old auth tokens are no longer valid"
\`\`\`

### 5.2 Commit Message Rules

- ✅ Utiliser l'impératif ("add" pas "added")
- ✅ Pas de majuscule au début
- ✅ Pas de point à la fin
- ✅ Ligne de sujet < 72 caractères
- ✅ Body optionnel pour détails

---

## 6. Pull Request Process

### 6.1 Avant de soumettre

**Checklist:**
- [ ] Code suit les standards
- [ ] Tests passent (\`pnpm test\`)
- [ ] Linting OK (\`pnpm lint\`)
- [ ] Build réussit (\`pnpm build\`)
- [ ] Documentation mise à jour
- [ ] Changelog mis à jour (si nécessaire)

### 6.2 PR Template

\`\`\`markdown
## Description
Brief description of changes

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
\`\`\`

### 6.3 Review Process

1. **Automated checks** : CI/CD pipeline
2. **Code review** : Au moins 1 approbation requise
3. **Testing** : Déploiement staging automatique
4. **Merge** : Squash and merge vers develop

### 6.4 Feedback

- ✅ Soyez constructif et respectueux
- ✅ Expliquez le "pourquoi" pas juste le "quoi"
- ✅ Proposez des alternatives
- ✅ Approuvez rapidement si OK

---

## 7. Testing

### 7.1 Unit Tests

\`\`\`typescript
// viamentor-students-utils.test.ts
import { describe, it, expect } from 'vitest'
import { calculateProgression } from './utils'

describe('calculateProgression', () => {
  it('should calculate percentage correctly', () => {
    const result = calculateProgression(15, 25)
    expect(result).toBe(60)
  })

  it('should return 0 for no lessons', () => {
    const result = calculateProgression(0, 0)
    expect(result).toBe(0)
  })
})
\`\`\`

### 7.2 Component Tests

\`\`\`typescript
// viamentor-student-card.test.tsx
import { render, screen } from '@testing-library/react'
import { StudentCard } from './viamentor-student-card'

describe('StudentCard', () => {
  it('should render student name', () => {
    const student = {
      id: '1',
      firstName: 'Marie',
      lastName: 'Dubois',
    }

    render(<StudentCard student={student} />)
    
    expect(screen.getByText('Marie Dubois')).toBeInTheDocument()
  })
})
\`\`\`

### 7.3 Running Tests

\`\`\`bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test:watch

# Run specific file
pnpm test viamentor-students-utils.test.ts
\`\`\`

---

## 8. Documentation

### 8.1 Code Documentation

\`\`\`typescript
/**
 * Student management component
 * 
 * @component
 * @example
 * <StudentsPage locale="fr" />
 */
export function StudentsPage({ locale }: StudentsPageProps) {
  // ...
}
\`\`\`

### 8.2 README Updates

Mettre à jour le README.md si vous:
- Ajoutez une nouvelle fonctionnalité majeure
- Changez les prérequis
- Modifiez les commandes de build/test
- Ajoutez de nouvelles dépendances

### 8.3 API Documentation

Mettre à jour API.md si vous:
- Ajoutez/modifiez des endpoints
- Changez les modèles de données
- Modifiez l'authentification

---

## Types de contributions

### 🐛 Bug Reports

**Template:**
\`\`\`markdown
**Description**
Clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]
\`\`\`

### ✨ Feature Requests

**Template:**
\`\`\`markdown
**Problem**
What problem does this solve?

**Solution**
Proposed solution

**Alternatives**
Other solutions considered

**Additional context**
Any other information
\`\`\`

### 📝 Documentation

- Corriger les typos
- Améliorer les explications
- Ajouter des exemples
- Traduire la documentation

### 🎨 Design

- Améliorer l'UI/UX
- Ajouter des animations
- Optimiser le responsive
- Améliorer l'accessibilité

---

## Questions?

- 💬 **Discord**: [Join our server](https://discord.gg/viamentor)
- 📧 **Email**: dev@viamentor.ch
- 🐛 **Issues**: [GitHub Issues](https://github.com/viamentor/viamentor/issues)

---

## Reconnaissance

Tous les contributeurs seront ajoutés au fichier CONTRIBUTORS.md.

Merci de contribuer à ViaMenutor ! 🎉

---

**Dernière mise à jour:** 2025-01-19  
**Version:** 1.0.0  
**Auteur:** ViaMenutor Team
`;

export default CONTRIBUTING_MD;
