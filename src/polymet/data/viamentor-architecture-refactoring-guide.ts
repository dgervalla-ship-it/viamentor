/**
 * VIAMENTOR - Architecture Refactoring Guide
 *
 * Guide pratique pour les développeurs sur l'utilisation de l'architecture
 * refactorisée avec patterns, composants réutilisables et best practices.
 *
 * @module data/viamentor-architecture-refactoring-guide
 * @version 1.0.0
 * @date 2025-01-22
 */

// ============================================================================
// TABLE OF CONTENTS
// ============================================================================

export const TABLE_OF_CONTENTS = {
  sections: [
    "1. Introduction",
    "2. Architecture Principles",
    "3. Reusable Components",
    "4. Page Creation Patterns",
    "5. Component Decomposition",
    "6. Best Practices",
    "7. Examples",
    "8. Testing Guidelines",
    "9. Troubleshooting",
  ],
} as const;

// ============================================================================
// 1. INTRODUCTION
// ============================================================================

export const INTRODUCTION = `
# Architecture Refactoring Guide

Ce guide explique comment utiliser l'architecture refactorisée de Viamentor
pour créer des pages et composants maintenables, testables et réutilisables.

## Objectifs de l'Architecture

✅ Pages légères (< 300 lignes)
✅ Composants réutilisables
✅ Séparation des responsabilités
✅ Patterns cohérents
✅ Facilité de test

## Principes Fondamentaux

1. **SOLID Principles**: Single Responsibility, Open/Closed, etc.
2. **Composition over Inheritance**: Composer des composants
3. **DRY**: Don't Repeat Yourself
4. **Container/Presentational**: Séparer logique et présentation
` as const;

// ============================================================================
// 2. ARCHITECTURE PRINCIPLES
// ============================================================================

export const ARCHITECTURE_PRINCIPLES = {
  solid: {
    singleResponsibility: {
      principle: "Un composant = une responsabilité",
      example: `
// ❌ BAD: Composant qui fait trop de choses
function UserDashboard() {
  // Fetch data
  // Display header
  // Display stats
  // Display charts
  // Display actions
  // Handle navigation
  // Handle filters
}

// ✅ GOOD: Composants séparés
function UserDashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      <DashboardActions />
    </>
  );
}
      `,
    },

    openClosed: {
      principle: "Ouvert à l'extension, fermé à la modification",
      example: `
// ✅ GOOD: Extension via props
interface PageContainerProps {
  maxWidth?: "sm" | "md" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
}

// Pas besoin de modifier le composant pour ajouter des variants
      `,
    },
  },

  composition: {
    principle: "Composer des composants plutôt qu'hériter",
    example: `
// ✅ GOOD: Composition
function DemoLayout({ children }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <QueryProvider>
          <PageContainer>
            {children}
          </PageContainer>
        </QueryProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
    `,
  },

  containerPresentational: {
    principle: "Séparer logique métier et présentation",
    example: `
// Container: Logique métier
function SearchPageContainer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  const handleSearch = (q) => {
    setQuery(q);
    // API call
  };
  
  return (
    <SearchPagePresentation
      query={query}
      results={results}
      onSearch={handleSearch}
    />
  );
}

// Presentational: Affichage uniquement
function SearchPagePresentation({ query, results, onSearch }) {
  return (
    <div>
      <SearchBar value={query} onChange={onSearch} />
      <SearchResults results={results} />
    </div>
  );
}
    `,
  },
} as const;

// ============================================================================
// 3. REUSABLE COMPONENTS
// ============================================================================

export const REUSABLE_COMPONENTS_GUIDE = {
  pageContainer: {
    name: "PageContainer",
    path: "@/polymet/components/viamentor-page-container",
    usage: `
import { PageContainer } from "@/polymet/components/viamentor-page-container";

// Basic usage
<PageContainer>
  <YourContent />
</PageContainer>

// With options
<PageContainer
  maxWidth="lg"        // sm | md | lg | xl | 2xl | full
  padding="md"         // none | sm | md | lg
  centered={false}     // Center content vertically
>
  <YourContent />
</PageContainer>
    `,
    whenToUse: [
      "Toutes les pages nécessitant un container standardisé",
      "Pages avec contenu centré",
      "Pages nécessitant un maxWidth responsive",
    ],
  },

  errorContainer: {
    name: "ErrorContainer",
    path: "@/polymet/components/viamentor-error-container",
    usage: `
import { ErrorContainer } from "@/polymet/components/viamentor-error-container";

// Error page
<ErrorContainer
  variant="error"
  title="Erreur 500"
  message="Une erreur est survenue"
  icon={AlertCircleIcon}
  actions={
    <Button onClick={handleRetry}>Réessayer</Button>
  }
  metadata="Code: 500 | ID: abc123"
/>

// 404 page
<ErrorContainer
  variant="warning"
  title="Page non trouvée"
  message="La page que vous recherchez n'existe pas"
  actions={
    <Button asChild>
      <Link to="/">Retour à l'accueil</Link>
    </Button>
  }
/>
    `,
    whenToUse: [
      "Pages d'erreur (404, 500, etc.)",
      "États vides (no data)",
      "Pages de maintenance",
    ],
  },

  demoLayout: {
    name: "DemoLayout",
    path: "@/polymet/components/viamentor-demo-layout",
    usage: `
import { DemoLayout } from "@/polymet/components/viamentor-demo-layout";

<DemoLayout
  title="Ma Page Démo"
  description="Description de la page"
  icon={SparklesIcon}
  badges={[
    { label: "Clean Code", variant: "secondary" },
    { label: "Modulaire", variant: "outline" },
  ]}
  actions={<Button>Action</Button>}
  withTheme={true}
  withLocale={true}
  withQuery={false}
  maxWidth="xl"
  padding="md"
>
  <YourDemoContent />
</DemoLayout>
    `,
    whenToUse: [
      "Toutes les pages de démonstration",
      "Pages nécessitant Theme/Locale providers",
      "Pages avec header standardisé",
    ],
  },

  demoSection: {
    name: "DemoSection",
    path: "@/polymet/components/viamentor-demo-section",
    usage: `
import { DemoSection } from "@/polymet/components/viamentor-demo-section";

<DemoSection
  title="Section Title"
  description="Section description"
  icon={DatabaseIcon}
  variant="card"              // default | card | transparent
  headerActions={<Button>Action</Button>}
>
  <YourSectionContent />
</DemoSection>
    `,
    whenToUse: [
      "Organiser le contenu en sections",
      "Sections avec titre et description",
      "Sections nécessitant des actions",
    ],
  },
} as const;

// ============================================================================
// 4. PAGE CREATION PATTERNS
// ============================================================================

export const PAGE_CREATION_PATTERNS = {
  simplePage: {
    name: "Simple Page Pattern",
    description: "Page simple sans logique complexe",
    template: `
import { PageContainer } from "@/polymet/components/viamentor-page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MySimplePage() {
  return (
    <PageContainer maxWidth="lg" padding="md">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Page Title</h1>
          <p className="text-muted-foreground">Page description</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Section Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content here</p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
    `,
  },

  complexPage: {
    name: "Complex Page Pattern",
    description: "Page avec logique métier et sous-composants",
    template: `
import { useState } from "react";
import { PageContainer } from "@/polymet/components/viamentor-page-container";

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function PageHeader({ title, onAction }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
}

function PageContent({ data }) {
  return (
    <div className="space-y-4">
      {data.map(item => (
        <Card key={item.id}>
          <CardContent>{item.name}</CardContent>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MyComplexPage() {
  const [data, setData] = useState([]);
  
  const handleAction = () => {
    // Business logic
  };
  
  return (
    <PageContainer maxWidth="xl" padding="md">
      <div className="space-y-6">
        <PageHeader title="My Page" onAction={handleAction} />
        <PageContent data={data} />
      </div>
    </PageContainer>
  );
}
    `,
  },

  demoPage: {
    name: "Demo Page Pattern",
    description: "Page de démonstration avec providers",
    template: `
import { DemoLayout } from "@/polymet/components/viamentor-demo-layout";
import { DemoSection } from "@/polymet/components/viamentor-demo-section";
import { SparklesIcon } from "lucide-react";

export function MyDemoPage() {
  return (
    <DemoLayout
      title="Demo Title"
      description="Demo description"
      icon={SparklesIcon}
      withTheme={true}
      withLocale={true}
    >
      <DemoSection title="Section 1">
        <p>Content 1</p>
      </DemoSection>
      
      <DemoSection title="Section 2">
        <p>Content 2</p>
      </DemoSection>
    </DemoLayout>
  );
}
    `,
  },
} as const;

// ============================================================================
// 5. COMPONENT DECOMPOSITION
// ============================================================================

export const COMPONENT_DECOMPOSITION = {
  whenToExtract: {
    title: "Quand extraire un composant ?",
    rules: [
      "Composant > 150 lignes",
      "Logique réutilisable",
      "Responsabilité distincte",
      "Code dupliqué",
      "Amélioration de la lisibilité",
    ],
  },

  howToExtract: {
    title: "Comment extraire un composant ?",
    steps: [
      "1. Identifier la responsabilité unique",
      "2. Définir l'interface (props)",
      "3. Extraire le JSX",
      "4. Extraire la logique associée",
      "5. Tester le composant isolément",
    ],

    example: `
// AVANT: Composant monolithique
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  return (
    <div>
      {/* Search bar - 50 lignes */}
      <div className="relative">
        <SearchIcon />
        <Input value={query} onChange={e => setQuery(e.target.value)} />
        {query && <Button onClick={() => setQuery("")}>Clear</Button>}
      </div>
      
      {/* Results - 100 lignes */}
      <div>
        {results.map(result => (
          <Card key={result.id}>
            <CardContent>
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <Badge>{result.type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// APRÈS: Composants extraits
function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative">
      <SearchIcon />
      <Input value={value} onChange={onChange} />
      {value && <Button onClick={onClear}>Clear</Button>}
    </div>
  );
}

function SearchResultCard({ result }) {
  return (
    <Card>
      <CardContent>
        <h3>{result.title}</h3>
        <p>{result.description}</p>
        <Badge>{result.type}</Badge>
      </CardContent>
    </Card>
  );
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  return (
    <div>
      <SearchBar
        value={query}
        onChange={e => setQuery(e.target.value)}
        onClear={() => setQuery("")}
      />
      <div>
        {results.map(result => (
          <SearchResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}
    `,
  },
} as const;

// ============================================================================
// 6. BEST PRACTICES
// ============================================================================

export const BEST_PRACTICES = {
  fileStructure: {
    title: "Structure de Fichier",
    template: `
/**
 * File header with description
 */

// ============================================================================
// IMPORTS
// ============================================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/polymet/components/viamentor-page-container";

// ============================================================================
// TYPES
// ============================================================================
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================
const MAX_ITEMS = 10;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function formatDate(date: Date) {
  return date.toLocaleDateString();
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function SubComponent({ data }: { data: string }) {
  return <div>{data}</div>;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <PageContainer>
      <h1>{title}</h1>
      <SubComponent data="test" />
    </PageContainer>
  );
}
    `,
  },

  naming: {
    title: "Conventions de Nommage",
    rules: {
      components: "PascalCase (MyComponent)",
      files: "kebab-case (my-component)",
      functions: "camelCase (handleClick)",
      constants: "UPPER_SNAKE_CASE (MAX_ITEMS)",
      types: "PascalCase (MyComponentProps)",
    },
  },

  props: {
    title: "Props Best Practices",
    rules: [
      "Toujours typer avec TypeScript",
      "Props optionnelles avec ?",
      "Valeurs par défaut avec destructuring",
      "Callbacks avec prefix 'on' (onClick, onSubmit)",
      "Boolean props sans 'is' prefix (disabled, not isDisabled)",
    ],

    example: `
interface ButtonProps {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

function Button({
  variant = "default",
  size = "md",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={\`btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
    `,
  },
} as const;

// ============================================================================
// 7. EXAMPLES
// ============================================================================

export const EXAMPLES = {
  beforeAfter: {
    title: "Exemples Avant/Après Refactorisation",

    example1: {
      name: "Global Search Page",
      before: "380 lignes monolithiques",
      after: "250 lignes avec 5 sous-composants",
      improvements: [
        "SearchBar component (40 lignes)",
        "SearchResultCard component (30 lignes)",
        "QuickSearches component (35 lignes)",
        "EmptyState component (20 lignes)",
        "KeyboardShortcuts component (25 lignes)",
      ],
    },

    example2: {
      name: "Error Page",
      before: "350 lignes avec code dupliqué",
      after: "180 lignes avec ErrorContainer réutilisable",
      improvements: [
        "ErrorContainer component réutilisé par not-found-page",
        "Variants pour différents types d'erreur",
        "Props interface claire et extensible",
      ],
    },
  },
} as const;

// ============================================================================
// 8. TESTING GUIDELINES
// ============================================================================

export const TESTING_GUIDELINES = {
  unitTests: {
    title: "Tests Unitaires",
    example: `
import { render, screen } from "@testing-library/react";
import { SearchBar } from "./search-bar";

describe("SearchBar", () => {
  it("renders with value", () => {
    render(<SearchBar value="test" onChange={() => {}} onClear={() => {}} />);
    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });
  
  it("calls onChange when typing", () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} onClear={() => {}} />);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new" } });
    
    expect(onChange).toHaveBeenCalled();
  });
  
  it("shows clear button when value is not empty", () => {
    render(<SearchBar value="test" onChange={() => {}} onClear={() => {}} />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });
});
    `,
  },

  integrationTests: {
    title: "Tests d'Intégration",
    example: `
import { render, screen, waitFor } from "@testing-library/react";
import { SearchPage } from "./search-page";

describe("SearchPage", () => {
  it("displays results after search", async () => {
    render(<SearchPage />);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    
    await waitFor(() => {
      expect(screen.getByText(/résultats trouvés/i)).toBeInTheDocument();
    });
  });
});
    `,
  },
} as const;

// ============================================================================
// 9. TROUBLESHOOTING
// ============================================================================

export const TROUBLESHOOTING = {
  commonIssues: [
    {
      issue: "Composant trop complexe (> 300 lignes)",
      solution: "Extraire des sous-composants avec responsabilités uniques",
      example: "Voir section 5. Component Decomposition",
    },
    {
      issue: "Code dupliqué entre pages",
      solution: "Créer un composant réutilisable",
      example: "Voir ErrorContainer pour pages d'erreur",
    },
    {
      issue: "Difficulté à tester",
      solution:
        "Séparer logique métier et présentation (Container/Presentational)",
      example: "Voir section 2. Architecture Principles",
    },
    {
      issue: "Props drilling (props passées sur plusieurs niveaux)",
      solution: "Utiliser Context API ou state management (Zustand)",
      example: "Voir ThemeProvider, LocaleProvider",
    },
  ],
} as const;

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  TABLE_OF_CONTENTS,
  INTRODUCTION,
  ARCHITECTURE_PRINCIPLES,
  REUSABLE_COMPONENTS_GUIDE,
  PAGE_CREATION_PATTERNS,
  COMPONENT_DECOMPOSITION,
  BEST_PRACTICES,
  EXAMPLES,
  TESTING_GUIDELINES,
  TROUBLESHOOTING,
} as const;
