export interface ApiError extends Error {
  statusCode: number;
  code: string;
  details?: Record<string, unknown>;
}

export interface ValidationError extends ApiError {
  fieldErrors: Record<string, string[]>;
}

export interface AuthError extends ApiError {
  reason: 'unauthorized' | 'forbidden' | 'invalid-credentials';
}

export interface DatabaseError extends ApiError {
  operation: 'create' | 'read' | 'update' | 'delete';
  entity: string;
}

export type ErrorType =
  | 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'DATABASE_ERROR'
  | 'NOT_FOUND'
  | 'SERVER_ERROR';
