import { Request, Response, NextFunction } from 'express';
import { AuditApplicabilityNotifier } from '@/services/audit-applicability-notifier';
import { ZodError } from 'zod';
import { AuditApplicabilitySchema } from '@/validators/audit-applicability.validators';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Audit Applicability Realtime Controller.
 */
export class AuditApplicabilityRealtimeController {
  /**
   * Creates an instance of AuditApplicabilityRealtimeController.
   */
  constructor(private readonly notifier: AuditApplicabilityNotifier) {}

  /**
   * Handles Audit Applicability event.
   */
  handleAuditApplicabilityEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditApplicabilitySchema.parse(req.body);

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
