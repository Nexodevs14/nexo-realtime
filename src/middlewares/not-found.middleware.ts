import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '@/errors/api.errors';

/**
 * Handles unmatched routes.
 *
 * This middleware is executed when no route matches the request.
 */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
}
