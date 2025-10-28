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
        <CardTitle>Titre de la Card</CardTitle>
        <CardDescription>Description de la card</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Contenu de la card avec du texte d'exemple.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button>Continuer</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Simple</CardTitle>
        <CardDescription>Sans footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Seulement header et contenu.</p>
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
            <span className="text-sm font-medium">15/35 leçons (43%)</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '43%' }} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-4">
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

export const InstructorCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Pierre MAILLARD</CardTitle>
        <CardDescription>Moniteur - Catégories B, A</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">📅 Disponibilités:</span>
            <span className="text-sm font-medium text-green-600">15h cette semaine</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">🚗 Élèves actifs:</span>
            <span className="text-sm font-medium">8</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">⭐ Note moyenne:</span>
            <span className="text-sm font-medium">4.8/5</span>
          </div>
          <div className="flex gap-1 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">🇫🇷 Français</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">🇬🇧 Anglais</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">Planning</Button>
        <Button className="flex-1">Assigner Élève</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Revenus du Mois
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">CHF 15'850.-</div>
        <p className="text-xs text-muted-foreground mt-1">
          +12.5% par rapport au mois dernier
        </p>
        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: '75%' }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          75% de l'objectif mensuel
        </p>
      </CardContent>
    </Card>
  ),
};

