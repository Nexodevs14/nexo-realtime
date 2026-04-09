import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AuditApplicabilityNotifier } from '@/services/audit-applicability-notifier';
import { AuditApplicabilityExportNotifier } from '@/services/audit-applicability-export-notifier';
import {
  AuditApplicabilitySchema,
  AuditApplicabilityExportCompletedSchema,
} from '@/validators/audit-applicability.validators';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Controller for Audit Applicability realtime events.
 */
export class AuditApplicabilityRealtimeController {
  constructor(
    private readonly notifier: AuditApplicabilityNotifier,
    private readonly exportNotifier: AuditApplicabilityExportNotifier
  ) {}

  /**
   * Handles generic applicability events (started, status changed).
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

  /**
   * Handles export completed event.
   */
  handleExportCompleted = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditApplicabilityExportCompletedSchema.parse(req.body);
      this.exportNotifier.notify(payload);
      ok(res, null, 'Realtime export notification dispatched');
    } catch (error) {
      console.error('Error handling export completed event:', error);
      if (error instanceof ZodError) {
        return next(
          new ValidationError(
            error.issues.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            }))
          )
        );
      }

      next(error);
    }
  };
}
