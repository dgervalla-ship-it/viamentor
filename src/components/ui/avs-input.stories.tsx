import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { AvsInput } from './avs-input';

const meta = {
  title: 'UI/AvsInput',
  component: AvsInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AvsInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: '',
  },
};

export const Valid: Story = {
  args: {
    value: '756.1234.5678.90',
  },
};

export const Invalid: Story = {
  args: {
    value: '123.4567.8901.23',
  },
};

export const WithoutDots: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div className="w-[400px] space-y-4">
        <p className="text-sm text-muted-foreground">
          Essayez de taper : 75612345678​90 (sans points)
        </p>
        <AvsInput 
          value={value}
          onChange={(val) => setValue(val)}
        />
        <p className="text-xs text-muted-foreground">
          Valeur actuelle : {value || '(vide)'}
        </p>
      </div>
    );
  },
};

export const InFormContext: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    
    return (
      <div className="w-[500px] p-6 border rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Inscription Élève - Identité</h3>
        
        <div className="space-y-2">
          <label className="text-sm">Nom</label>
          <input className="w-full px-3 py-2 border rounded-md" placeholder="Weber" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm">Prénom</label>
          <input className="w-full px-3 py-2 border rounded-md" placeholder="Kevin" />
        </div>
        
        <AvsInput 
          value={value}
          onChange={(val, valid) => {
            setValue(val);
            setIsValid(valid);
          }}
        />
        
        <button 
          className="w-full px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          disabled={!isValid}
        >
          Continuer
        </button>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div>
        <p className="text-sm font-medium mb-2">État initial (vide)</p>
        <AvsInput value="" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">En cours de saisie (invalide)</p>
        <AvsInput value="756.12" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">N° AVS valide</p>
        <AvsInput value="756.1234.5678.90" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">N° AVS invalide (ne commence pas par 756)</p>
        <AvsInput value="123.4567.8901.23" />
      </div>
    </div>
  ),
};

