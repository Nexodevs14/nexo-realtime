import { Request, Response, NextFunction } from 'express';
import { ApiErrorResponse, error } from '@/types/http.types';
import { AppError } from '@/errors/api.errors';

/**
 * Global error handler middleware.
 *
 * Single responsibility:
 * - Convert application errors into HTTP responses
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    error(res, err.message, err.statusCode, err.errors);
    return;
  }

  error(res, 'Internal server error', 500, [{ message: 'Unexpected error' }]);
}
