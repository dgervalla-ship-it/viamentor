# 📚 GUIDE STORYBOOK - VIAMENTOR

**Version** : 1.0  
**Date** : 28 octobre 2025  
**Stack** : Storybook 8+ | React 19 | Vite 6 | TypeScript  
**Objectif** : Documenter et tester composants UI isolément

---

## 🎯 POURQUOI STORYBOOK ?

### Bénéfices Viamentor
1. **Designers** : Preview tous les variants composants
2. **Devs** : Référence vivante et testable
3. **QA** : Tester composants isolément
4. **Documentation** : Auto-générée et toujours à jour
5. **Collaboration** : Design system partagé équipe

### Use Cases
- Développer composants isolés (pas besoin app complète)
- Tester tous les états (loading, error, empty, success)
- Regression visuelle (Chromatic)
- A11y testing automatisé
- Documentation interactive

---

## 📦 INSTALLATION

### Étape 1 : Installer Storybook
```bash
cd "/Users/doti/viamentor fini"

# Installation automatique (détecte Vite + React)
npx storybook@latest init

# Suivre wizard
✓ Détecter projet : Vite + React ✓
✓ Installer dépendances
✓ Configurer scripts npm
✓ Créer .storybook/ config
✓ Créer stories exemples
```

**Packages installés** :
- `@storybook/react` : Core Storybook React
- `@storybook/addon-essentials` : Addons de base
- `@storybook/addon-a11y` : Tests accessibilité
- `@storybook/addon-interactions` : Tests interactions
- `@storybook/test` : Testing utilities

### Étape 2 : Lancer Storybook
```bash
npm run storybook
# Ouvre http://localhost:6006
```

---

## ⚙️ CONFIGURATION

### `.storybook/main.ts`
```typescript
import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/viamentor/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag", // Auto-génère docs si tag 'autodocs'
  },
};

export default config;
```

### `.storybook/preview.ts`
```typescript
import type { Preview } from "@storybook/react";
import "../src/index.css"; // Import Tailwind global

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0f172a" },
      ],
    },
  },
};

export default preview;
```

---

## 📝 CRÉER STORIES

### Exemple 1 : Button Component

**Fichier** : `src/components/ui/button.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Trash2, Plus, Download } from 'lucide-react';

// Meta définit le composant et sa position dans Storybook
const meta = {
  title: 'UI/Button', // Catégorie dans sidebar
  component: Button,
  parameters: {
    layout: 'centered', // Centré dans canvas
  },
  tags: ['autodocs'], // Génère page documentation auto
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Style visuel du bouton',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Taille du bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver le bouton',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story de base
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};

// Variants
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

// Avec icônes
export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <Plus className="mr-2 h-4 w-4" />
        Add New
      </>
    ),
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Download
        <Download className="ml-2 h-4 w-4" />
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    variant: 'outline',
    children: <Trash2 className="h-4 w-4" />,
  },
};

// États
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <span className="animate-spin mr-2">⏳</span>
        Loading...
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

// Tailles
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// Tous les variants (Grid)
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
};
```

---

### Exemple 2 : Card Component

**Fichier** : `src/components/ui/card.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';
import { Button } from './button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some example text.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>Without footer.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Just header and content.</p>
      </CardContent>
    </Card>
  ),
};

export const StudentCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Kevin WEBER</CardTitle>
        <CardDescription>Élève - Catégorie B</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Progression</span>
            <span className="text-sm font-medium">15/35 leçons</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[43%]" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>📞 +41 79 123 45 67</span>
            <span>📧 kevin.weber@gmail.com</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Voir Détails</Button>
      </CardFooter>
    </Card>
  ),
};
```

---

### Exemple 3 : Form Component (Complexe)

**Fichier** : `src/viamentor/components/students/student-form.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { StudentForm } from './student-form';

const meta = {
  title: 'Students/StudentForm',
  component: StudentForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StudentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Happy path
export const EmptyForm: Story = {
  args: {
    onSubmit: (data) => console.log('Submitted:', data),
    onCancel: () => console.log('Cancelled'),
  },
};

// Avec données pré-remplies (Edit mode)
export const EditMode: Story = {
  args: {
    initialData: {
      firstName: 'Kevin',
      lastName: 'WEBER',
      dateOfBirth: '2005-03-15',
      avsNumber: '756.1234.5678.90',
      phone: '+41 79 123 45 67',
      email: 'kevin.weber@gmail.com',
      address: 'Rue du Lac 12',
      postalCode: '1200',
      city: 'Genève',
      category: 'B',
      courseType: 'standard',
    },
    onSubmit: (data) => console.log('Updated:', data),
    onCancel: () => console.log('Cancelled'),
  },
};

// Test interactions
export const FillAndSubmit: Story = {
  args: {
    onSubmit: (data) => console.log('Submitted:', data),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Remplir formulaire
    await userEvent.type(canvas.getByLabelText(/prénom/i), 'Sophie');
    await userEvent.type(canvas.getByLabelText(/nom/i), 'MARTIN');
    await userEvent.type(canvas.getByLabelText(/email/i), 'sophie@example.com');
    
    // Soumettre
    await userEvent.click(canvas.getByRole('button', { name: /créer/i }));
    
    // Vérifier qu'on a bien soumis
    await expect(canvas.getByText(/élève créé/i)).toBeInTheDocument();
  },
};

// Error state
export const WithValidationErrors: Story = {
  render: () => (
    <StudentForm
      initialErrors={{
        avsNumber: 'N° AVS invalide',
        email: 'Email invalide',
      }}
      onSubmit={() => {}}
      onCancel={() => {}}
    />
  ),
};
```

---

## 🎨 BEST PRACTICES

### 1. Nommage Stories
```typescript
// ✅ BON
export const Default: Story = {};
export const WithIcon: Story = {};
export const Loading: Story = {};
export const Disabled: Story = {};

// ❌ MAUVAIS
export const Story1: Story = {};
export const test: Story = {};
```

### 2. Organisation Hiérarchique
```
UI/
  Button
  Card
  Input
  Dialog

Forms/
  StudentForm
  InstructorForm
  LoginForm

Students/
  StudentCard
  StudentTable
  StudentDetail

Dashboard/
  StatsCard
  RevenueChart
```

### 3. Controls (Args)
```typescript
argTypes: {
  variant: {
    control: 'select', // Dropdown
    options: ['default', 'primary', 'secondary'],
  },
  size: {
    control: 'inline-radio', // Radio buttons
    options: ['sm', 'md', 'lg'],
  },
  disabled: {
    control: 'boolean', // Checkbox
  },
  label: {
    control: 'text', // Text input
  },
  count: {
    control: { type: 'range', min: 0, max: 100, step: 1 }, // Slider
  },
  date: {
    control: 'date', // Date picker
  },
  color: {
    control: 'color', // Color picker
  },
}
```

### 4. Documentation Markdown
```typescript
/**
 * ## Button Component
 * 
 * Le composant Button est utilisé pour les actions utilisateur.
 * 
 * ### Usage
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="destructive">Delete</Button>
 * ```
 * 
 * ### Variants
 * - `default` : Action principale
 * - `destructive` : Actions destructives (delete)
 * - `outline` : Actions secondaires
 * - `ghost` : Actions tertiaires
 * - `link` : Style lien
 */
```

---

## 🧪 TESTS AVEC STORYBOOK

### Test Interactions
```typescript
import { expect, userEvent, within } from '@storybook/test';

export const TestLogin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Remplir formulaire
    await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'password123');
    
    // Cliquer submit
    await userEvent.click(canvas.getByRole('button', { name: /login/i }));
    
    // Vérifier succès
    await expect(canvas.getByText('Welcome!')).toBeInTheDocument();
  },
};
```

### Test A11y
```typescript
import { within } from '@storybook/test';
import { axe } from 'jest-axe';

export const Accessible: Story = {
  play: async ({ canvasElement }) => {
    const results = await axe(canvasElement);
    expect(results).toHaveNoViolations();
  },
};
```

---

## 📦 ADDONS RECOMMANDÉS

### Essentials (Inclus)
- **Controls** : Modifier props en temps réel
- **Actions** : Logger événements (onClick, etc.)
- **Viewport** : Tester responsive (mobile/tablet/desktop)
- **Backgrounds** : Tester sur différents backgrounds
- **Docs** : Auto-documentation

### Additionnels
```bash
# A11y (Accessibilité)
npm install --save-dev @storybook/addon-a11y

# Interactions (Tests)
npm install --save-dev @storybook/addon-interactions

# Chromatic (Visual regression)
npm install --save-dev chromatic

# Pseudo-states (hover, focus, active)
npm install --save-dev @storybook/addon-pseudo-states
```

---

## 🚀 WORKFLOW VIAMENTOR

### 1. Designer crée maquette Figma
```
Figma → Variants définies
```

### 2. Dev crée story **AVANT** intégration
```tsx
// button.stories.tsx créé en premier
// Tous variants testés isolément
```

### 3. Story = Documentation vivante
```
Story remplace specs Word/Confluence
```

### 4. QA teste composant isolé
```
Tous états testés sans monter app complète
```

### 5. Deploy Storybook staging
```bash
npm run build-storybook
# Deploy sur Vercel/Netlify
# URL : storybook.viamentor.ch
```

---

## 📊 MÉTRIQUES SUCCÈS

### Avant Storybook
- ❌ Pas de documentation composants
- ❌ Tests UI manuels (app complète)
- ❌ Designers ne voient pas variants
- ❌ Drift Figma ↔ Code

### Avec Storybook
- ✅ 100% composants documentés
- ✅ Tests isolés automatisés
- ✅ Designers voient code vivant
- ✅ Source of truth partagée

---

## ✅ CHECKLIST DÉPLOIEMENT

- [ ] Storybook installé (`npx storybook init`)
- [ ] Config `.storybook/` OK
- [ ] 20+ composants UI avec stories
- [ ] Stories composants métier critiques
- [ ] Tests interactions top parcours
- [ ] A11y addon activé
- [ ] Deploy staging (https://storybook.viamentor.ch)
- [ ] Lien dans README.md

---

## 📚 RESSOURCES

- **Docs officielles** : https://storybook.js.org/docs
- **Addons** : https://storybook.js.org/addons
- **Recipes** : https://storybook.js.org/recipes
- **Discord** : https://discord.gg/storybook

---

_Guide créé le 28 octobre 2025 - Prêt pour implémentation_

