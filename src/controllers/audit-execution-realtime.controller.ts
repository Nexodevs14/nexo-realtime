import { Request, Response, NextFunction } from 'express';
import { AuditExecutionNotifier } from '@/services/audit-execution-notifier';
import { ZodError } from 'zod';
import { AuditExecutionSchema } from '@/validators/audit-execution.validators';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Audit Execution Realtime Controller.
 */
export class AuditExecutionRealtimeController {
  /**
   * Creates an instance of AuditExecutionRealtimeController.
   */
  constructor(private readonly notifier: AuditExecutionNotifier) {}

  /**
   * Handles Audit Execution event.
   */
  handleAuditExecutionEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditExecutionSchema.parse(req.body);

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
