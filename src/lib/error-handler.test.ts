import { describe, it, expect } from 'vitest';
import {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  DatabaseError,
  NetworkError,
  handleSupabaseError,
  handleError,
  apiCall,
  retryApiCall,
} from './error-handler';

describe('Error Handler', () => {
  describe('AppError classes', () => {
    it('devrait créer une AppError basique', () => {
      const error = new AppError('Test error', 'TEST_ERROR', 500);
      
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_ERROR');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
    });

    it('devrait créer une ValidationError', () => {
      const error = new ValidationError('Invalid email', 'email');
      
      expect(error.message).toBe('Invalid email');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.field).toBe('email');
    });

    it('devrait créer une AuthenticationError', () => {
      const error = new AuthenticationError();
      
      expect(error.message).toBe('Authentication required');
      expect(error.code).toBe('AUTHENTICATION_ERROR');
      expect(error.statusCode).toBe(401);
    });

    it('devrait créer une AuthorizationError', () => {
      const error = new AuthorizationError();
      
      expect(error.message).toBe('Insufficient permissions');
      expect(error.code).toBe('AUTHORIZATION_ERROR');
      expect(error.statusCode).toBe(403);
    });

    it('devrait créer une NotFoundError', () => {
      const error = new NotFoundError('Student');
      
      expect(error.message).toBe('Student not found');
      expect(error.code).toBe('NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('devrait créer une ConflictError', () => {
      const error = new ConflictError('Email already exists');
      
      expect(error.message).toBe('Email already exists');
      expect(error.code).toBe('CONFLICT');
      expect(error.statusCode).toBe(409);
    });

    it('devrait créer une DatabaseError', () => {
      const originalError = new Error('Connection failed');
      const error = new DatabaseError('DB error', originalError);
      
      expect(error.message).toBe('DB error');
      expect(error.code).toBe('DATABASE_ERROR');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(false);
      expect(error.originalError).toBe(originalError);
    });

    it('devrait créer une NetworkError', () => {
      const error = new NetworkError();
      
      expect(error.message).toBe('Network error occurred');
      expect(error.code).toBe('NETWORK_ERROR');
      expect(error.statusCode).toBe(503);
      expect(error.isOperational).toBe(false);
    });
  });

  describe('handleSupabaseError', () => {
    it('devrait convertir erreur JWT en AuthenticationError', () => {
      const supabaseError = { message: 'JWT expired', code: '42501' };
      const error = handleSupabaseError(supabaseError);
      
      expect(error).toBeInstanceOf(AuthenticationError);
    });

    it('devrait convertir contrainte unique en ConflictError', () => {
      const supabaseError = { message: 'Duplicate key', code: '23505' };
      const error = handleSupabaseError(supabaseError);
      
      expect(error).toBeInstanceOf(ConflictError);
    });

    it('devrait convertir PGRST116 en NotFoundError', () => {
      const supabaseError = { message: 'Not found', code: 'PGRST116' };
      const error = handleSupabaseError(supabaseError);
      
      expect(error).toBeInstanceOf(NotFoundError);
    });

    it('devrait convertir erreur RLS en AuthorizationError', () => {
      const supabaseError = { message: 'RLS policy violation', code: '42501' };
      const error = handleSupabaseError(supabaseError);
      
      expect(error).toBeInstanceOf(AuthorizationError);
    });

    it('devrait convertir erreur network en NetworkError', () => {
      const supabaseError = { message: 'Connection timeout' };
      const error = handleSupabaseError(supabaseError);
      
      expect(error).toBeInstanceOf(NetworkError);
    });

    it('devrait créer DatabaseError par défaut', () => {
      const supabaseError = { message: 'Unknown error' };
      const error = handleSupabaseError(supabaseError);
      
      expect(error).toBeInstanceOf(DatabaseError);
    });
  });

  describe('handleError', () => {
    it('devrait gérer une AppError', () => {
      const appError = new ValidationError('Invalid input');
      const result = handleError(appError);
      
      expect(result.message).toBe('Invalid input');
      expect(result.code).toBe('VALIDATION_ERROR');
      expect(result.statusCode).toBe(400);
    });

    it('devrait masquer les erreurs non opérationnelles', () => {
      const dbError = new DatabaseError('Internal error');
      const result = handleError(dbError);
      
      expect(result.message).toBe('An unexpected error occurred. Please try again.');
      expect(result.code).toBe('DATABASE_ERROR');
    });

    it('devrait gérer les erreurs JavaScript standard', () => {
      const error = new Error('Something went wrong');
      const result = handleError(error);
      
      expect(result.message).toBe('An unexpected error occurred. Please try again.');
      expect(result.code).toBe('UNKNOWN_ERROR');
    });

    it('devrait gérer les erreurs inconnues', () => {
      const error = 'string error';
      const result = handleError(error);
      
      expect(result.message).toBe('An unexpected error occurred. Please try again.');
      expect(result.code).toBe('UNKNOWN_ERROR');
    });
  });

  describe('apiCall', () => {
    it('devrait exécuter la fonction avec succès', async () => {
      const result = await apiCall(async () => 'success');
      expect(result).toBe('success');
    });

    it('devrait propager les AppErrors', async () => {
      await expect(
        apiCall(async () => {
          throw new ValidationError('Invalid');
        })
      ).rejects.toThrow(ValidationError);
    });

    it('devrait wrapper les erreurs standards', async () => {
      await expect(
        apiCall(async () => {
          throw new Error('Standard error');
        }, 'Custom API error')
      ).rejects.toThrow('Custom API error');
    });
  });

  describe('retryApiCall', () => {
    it('devrait réussir au premier essai', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await retryApiCall(fn, 3);
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('devrait réessayer en cas d\'erreur réseau', async () => {
      let attempt = 0;
      const fn = vi.fn().mockImplementation(async () => {
        attempt++;
        if (attempt < 3) {
          throw new NetworkError();
        }
        return 'success';
      });

      const result = await retryApiCall(fn, 3, 10);
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('ne devrait pas réessayer pour les erreurs opérationnelles', async () => {
      const fn = vi.fn().mockRejectedValue(new ValidationError('Invalid'));
      
      await expect(retryApiCall(fn, 3)).rejects.toThrow(ValidationError);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('devrait échouer après max retries', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Network error'));
      
      await expect(retryApiCall(fn, 3, 10)).rejects.toThrow(NetworkError);
      expect(fn).toHaveBeenCalledTimes(3);
    });
  });
});

