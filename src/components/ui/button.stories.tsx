import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Trash2, Plus, Download, Loader2 } from 'lucide-react';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
        Ajouter
      </>
    ),
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Télécharger
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
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Chargement...
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Désactivé',
  },
};

// Tailles
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Petit Bouton',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Grand Bouton',
  },
};

// Tous les variants (Grid)
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
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
      <div className="flex gap-2">
        <Button disabled>Disabled</Button>
        <Button>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </Button>
      </div>
    </div>
  ),
};

