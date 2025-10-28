/**
 * Viamentor - Global Error Handler
 * Gestion centralisée des erreurs de l'application
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
    this.name = 'ConflictError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, public originalError?: Error) {
    super(message, 'DATABASE_ERROR', 500, false);
    this.name = 'DatabaseError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR', 503, false);
    this.name = 'NetworkError';
  }
}

// Types pour les erreurs Supabase
interface SupabaseError {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
}

/**
 * Convertir une erreur Supabase en AppError
 */
export function handleSupabaseError(error: SupabaseError): AppError {
  const message = error.message || 'An error occurred';
  const code = error.code || 'UNKNOWN_ERROR';

  // Erreurs d'authentification
  if (code === '42501' || message.includes('JWT')) {
    return new AuthenticationError(message);
  }

  // Erreur de contrainte unique
  if (code === '23505') {
    return new ConflictError('This resource already exists');
  }

  // Erreur de clé étrangère
  if (code === '23503') {
    return new ValidationError('Referenced resource does not exist');
  }

  // Erreur not found
  if (code === 'PGRST116') {
    return new NotFoundError('Resource');
  }

  // RLS policy violation
  if (code === '42501' || message.includes('policy')) {
    return new AuthorizationError('You do not have permission to perform this action');
  }

  // Erreur de connexion
  if (message.includes('connection') || message.includes('network')) {
    return new NetworkError(message);
  }

  // Erreur de base de données générique
  return new DatabaseError(message, new Error(message));
}

/**
 * Logger une erreur
 */
export function logError(error: Error | AppError, context?: Record<string, any>): void {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    name: error.name,
    message: error.message,
    stack: error.stack,
    ...(error instanceof AppError && {
      code: error.code,
      statusCode: error.statusCode,
      isOperational: error.isOperational,
    }),
    context,
  };

  // En développement : log dans la console
  if (import.meta.env.DEV) {
    console.error('❌ Error:', errorInfo);
  }

  // En production : envoyer à Sentry (à implémenter)
  if (import.meta.env.PROD) {
    // TODO: Sentry.captureException(error, { extra: errorInfo });
    console.error('Error logged:', errorInfo);
  }
}

/**
 * Gérer une erreur et retourner un message utilisateur
 */
export function handleError(error: unknown, context?: Record<string, any>): {
  message: string;
  code: string;
  statusCode: number;
} {
  let appError: AppError;

  // Convertir en AppError si nécessaire
  if (error instanceof AppError) {
    appError = error;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    // Erreur Supabase
    appError = handleSupabaseError(error as SupabaseError);
  } else if (error instanceof Error) {
    appError = new AppError(error.message, 'UNKNOWN_ERROR', 500, false);
  } else {
    appError = new AppError('An unexpected error occurred', 'UNKNOWN_ERROR', 500, false);
  }

  // Logger l'erreur
  logError(appError, context);

  // Retourner les infos pour l'utilisateur
  return {
    message: appError.isOperational 
      ? appError.message 
      : 'An unexpected error occurred. Please try again.',
    code: appError.code,
    statusCode: appError.statusCode,
  };
}

/**
 * Hook React pour gérer les erreurs
 */
export function useErrorHandler() {
  const handleAsyncError = async <T>(
    asyncFn: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      const errorInfo = handleError(error, context);
      // TODO: Afficher une notification toast avec errorInfo.message
      console.error('Async error:', errorInfo);
      return null;
    }
  };

  const handleSyncError = (
    error: unknown,
    context?: Record<string, any>
  ): void => {
    handleError(error, context);
  };

  return {
    handleAsyncError,
    handleSyncError,
  };
}

/**
 * Wrapper pour les appels API
 */
export async function apiCall<T>(
  fn: () => Promise<T>,
  errorMessage?: string
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const customError = error instanceof AppError 
      ? error 
      : new AppError(
          errorMessage || 'API call failed',
          'API_ERROR',
          500
        );
    
    logError(customError);
    throw customError;
  }
}

/**
 * Retry logic pour les appels réseau
 */
export async function retryApiCall<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // Ne pas retry sur les erreurs opérationnelles
      if (error instanceof AppError && error.isOperational && error.statusCode < 500) {
        throw error;
      }

      // Dernier essai
      if (attempt === maxRetries) {
        break;
      }

      // Attendre avant de réessayer
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      
      console.warn(`Retry attempt ${attempt}/${maxRetries}...`);
    }
  }

  throw new NetworkError(
    lastError?.message || 'Network request failed after multiple retries'
  );
}

