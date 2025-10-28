import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ConsentCheckbox, ConsentGroup } from './consent-checkbox';

const meta = {
  title: 'UI/ConsentCheckbox',
  component: ConsentCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConsentCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Faber: Story = {
  args: {
    id: 'consent-faber',
    type: 'faber',
    checked: false,
    onCheckedChange: () => {},
  },
};

export const CGU: Story = {
  args: {
    id: 'consent-cgu',
    type: 'cgu',
    checked: false,
    onCheckedChange: () => {},
  },
};

export const RGPD: Story = {
  args: {
    id: 'consent-rgpd',
    type: 'rgpd',
    checked: false,
    onCheckedChange: () => {},
  },
};

export const Newsletter: Story = {
  args: {
    id: 'consent-newsletter',
    type: 'newsletter',
    checked: false,
    onCheckedChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    
    return (
      <div className="w-[500px] space-y-4">
        <p className="text-sm text-muted-foreground">
          Cliquez pour cocher/décocher. Survolez l'icône (i) pour voir les détails.
        </p>
        <ConsentCheckbox
          id="consent-demo"
          type="faber"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="text-xs text-muted-foreground">
          État actuel : {checked ? '✓ Coché' : '☐ Non coché'}
        </p>
      </div>
    );
  },
};

export const FullForm: Story = {
  render: () => {
    const [values, setValues] = React.useState({
      faber: false,
      cgu: false,
      rgpd: false,
      newsletter: false,
    });

    const handleChange = (type: keyof typeof values, checked: boolean) => {
      setValues(prev => ({ ...prev, [type]: checked }));
    };

    const allRequiredAccepted = values.faber && values.cgu && values.rgpd;

    return (
      <div className="w-[600px] p-6 border rounded-lg space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Inscription Élève - Étape 3/4</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Autorisations et consentements
          </p>
        </div>

        <ConsentGroup
          values={values}
          onChange={handleChange}
          showNewsletter={true}
        />

        <div className="pt-4 border-t flex justify-between">
          <button className="px-4 py-2 border rounded-md">
            ← Précédent
          </button>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
            disabled={!allRequiredAccepted}
          >
            Continuer →
          </button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>État des consentements :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>FABER : {values.faber ? '✓' : '☐'}</li>
            <li>CGU : {values.cgu ? '✓' : '☐'}</li>
            <li>RGPD : {values.rgpd ? '✓' : '☐'}</li>
            <li>Newsletter : {values.newsletter ? '✓' : '☐'} (optionnel)</li>
          </ul>
          <p className="pt-2">
            Bouton "Continuer" {allRequiredAccepted ? 'actif ✓' : 'désactivé (acceptez tous les consentements obligatoires)'}
          </p>
        </div>
      </div>
    );
  },
};

export const BeforeAfterComparison: Story = {
  render: () => (
    <div className="space-y-8 w-[700px]">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-red-600">❌ AVANT (Jargon technique)</h3>
        <div className="p-4 border rounded-lg space-y-2 bg-red-50">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">☐ Autorisation FABER</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">☐ Accepte CGU</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">☐ Consent RGPD (traitement données)</span>
          </label>
          <p className="text-xs text-red-600 mt-2">
            😟 Utilisateurs confus : "C'est quoi FABER ? RGPD ?"
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4 text-green-600">✅ APRÈS (Langage clair)</h3>
        <div className="p-4 border rounded-lg bg-green-50">
          <ConsentGroup
            values={{ faber: false, cgu: false, rgpd: false, newsletter: false }}
            onChange={() => {}}
          />
          <p className="text-xs text-green-600 mt-4">
            😊 Utilisateurs comprennent : Texte simple + tooltip explicatif
          </p>
        </div>
      </div>
    </div>
  ),
};