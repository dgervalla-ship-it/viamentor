import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AutoSaveIndicator } from './auto-save-indicator';

describe('AutoSaveIndicator Component', () => {
  it('devrait afficher "Sauvegarde..." quand isSaving=true', () => {
    render(<AutoSaveIndicator isSaving={true} />);
    expect(screen.getByText('Sauvegarde...')).toBeInTheDocument();
  });

  it('devrait afficher "Sauvegardé..." avec lastSaved', () => {
    const lastSaved = new Date();
    render(<AutoSaveIndicator isSaving={false} lastSaved={lastSaved} />);
    expect(screen.getByText(/Sauvegardé/)).toBeInTheDocument();
  });

  it('devrait afficher "Pas encore sauvegardé" si aucune sauvegarde', () => {
    render(<AutoSaveIndicator isSaving={false} />);
    expect(screen.getByText('Pas encore sauvegardé')).toBeInTheDocument();
  });

  it('devrait afficher le spinner quand isSaving=true', () => {
    const { container } = render(<AutoSaveIndicator isSaving={true} />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('devrait afficher la checkmark quand sauvegardé', () => {
    const lastSaved = new Date();
    const { container } = render(<AutoSaveIndicator isSaving={false} lastSaved={lastSaved} />);
    // La checkmark (Check icon) devrait être présente
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

