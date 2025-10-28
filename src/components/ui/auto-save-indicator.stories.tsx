import type { Meta, StoryObj } from '@storybook/react';
import { AutoSaveIndicator } from './auto-save-indicator';

const meta = {
  title: 'UI/AutoSaveIndicator',
  component: AutoSaveIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AutoSaveIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Saving: Story = {
  args: {
    isSaving: true,
  },
};

export const SavedRecently: Story = {
  args: {
    isSaving: false,
    lastSaved: new Date(Date.now() - 5000), // 5 seconds ago
  },
};

export const SavedMinutesAgo: Story = {
  args: {
    isSaving: false,
    lastSaved: new Date(Date.now() - 120000), // 2 minutes ago
  },
};

export const NotSavedYet: Story = {
  args: {
    isSaving: false,
    lastSaved: undefined,
  },
};

export const InFormContext: Story = {
  render: () => (
    <div className="w-[500px] p-6 border rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Inscription Élève - Étape 2/4</h3>
        <AutoSaveIndicator isSaving={false} lastSaved={new Date(Date.now() - 3000)} />
      </div>
      <div className="space-y-2">
        <label className="text-sm">Nom</label>
        <input className="w-full px-3 py-2 border rounded-md" placeholder="Weber" />
      </div>
      <div className="space-y-2">
        <label className="text-sm">Prénom</label>
        <input className="w-full px-3 py-2 border rounded-md" placeholder="Kevin" />
      </div>
      <p className="text-xs text-muted-foreground">
        💡 Vos données sont sauvegardées automatiquement toutes les 2 secondes
      </p>
    </div>
  ),
};

