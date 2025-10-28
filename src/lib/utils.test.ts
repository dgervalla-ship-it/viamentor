import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn() utility function', () => {
  it('devrait fusionner les classes simples', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('devrait gérer les classes conditionnelles', () => {
    const result = cn('base', true && 'active', false && 'disabled');
    expect(result).toBe('base active');
  });

  it('devrait fusionner les classes Tailwind conflictuelles', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toContain('px-4');
    expect(result).toContain('py-1');
  });

  it('devrait ignorer les valeurs undefined/null', () => {
    const result = cn('base', undefined, null, 'active');
    expect(result).toBe('base active');
  });

  it('devrait gérer les objets de classes', () => {
    const result = cn({
      active: true,
      disabled: false,
    });
    expect(result).toBe('active');
  });
});

