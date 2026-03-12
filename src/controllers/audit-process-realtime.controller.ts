import { Request, Response, NextFunction } from 'express';
import { AuditProcessNotifier } from '@/services/audit-process-notifier';
import { ZodError } from 'zod';
import { AuditProcessSchema } from '@/validators/audit-process.validators';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Audit Process Realtime Controller.
 */
export class AuditProcessRealtimeController {
  /**
   * Creates an instance of AuditProcessRealtimeController.
   */
  constructor(private readonly notifier: AuditProcessNotifier) {}

  /**
   * Handles Audit Process event.
   */
  handleAuditProcessEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditProcessSchema.parse(req.body);

      this.notifier.notify(payload);
      ok(res, null, 'Realtime notification dispatched');
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new ValidationError(
            error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            }))
          )
        );
      }

      next(error);
    }
  };
}
