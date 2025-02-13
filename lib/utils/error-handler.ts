import { ApiError, ValidationError, AuthError, DatabaseError, ErrorType } from '../types/errors';

export class ErrorHandler {
  static createError(
    type: ErrorType,
    message: string,
    details?: Record<string, unknown>
  ): ApiError {
    const error: ApiError = {
      name: type,
      message,
      statusCode: this.getStatusCode(type),
      code: type,
      details,
    } as ApiError;

    return error;
  }

  static getStatusCode(type: ErrorType): number {
    switch (type) {
      case 'VALIDATION_ERROR':
        return 400;
      case 'AUTH_ERROR':
        return 401;
      case 'NOT_FOUND':
        return 404;
      case 'DATABASE_ERROR':
        return 500;
      case 'SERVER_ERROR':
        return 500;
      default:
        return 500;
    }
  }

  static handleApiError(error: unknown): ApiError {
    if (error instanceof Error) {
      return this.createError('SERVER_ERROR', error.message || 'An unexpected error occurred');
    }

    return this.createError('SERVER_ERROR', 'An unexpected error occurred');
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof Error && 'statusCode' in error && 'code' in error;
  }

  static createValidationError(fieldErrors: Record<string, string[]>): ValidationError {
    return {
      ...this.createError('VALIDATION_ERROR', 'Validation failed'),
      fieldErrors,
    } as ValidationError;
  }

  static createAuthError(reason: AuthError['reason']): AuthError {
    const messages = {
      unauthorized: 'You must be logged in to access this resource',
      forbidden: 'You do not have permission to access this resource',
      'invalid-credentials': 'Invalid credentials provided',
    };

    return {
      ...this.createError('AUTH_ERROR', messages[reason]),
      reason,
    } as AuthError;
  }

  static createDatabaseError(
    operation: DatabaseError['operation'],
    entity: string,
    details?: Record<string, unknown>
  ): DatabaseError {
    return {
      ...this.createError(
        'DATABASE_ERROR',
        `Database ${operation} operation failed for ${entity}`,
        details
      ),
      operation,
      entity,
    } as DatabaseError;
  }
}
