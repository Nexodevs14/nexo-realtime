import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { AuditApplicabilityAspectNotifier } from '@/services/audit-applicability-aspect-notifier';
import { AuditApplicabilityAspectSchema } from '@/validators/audit-applicability-aspect.validators';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Audit Applicability Aspect Realtime Controller.
 *
 * Receives events from the Laravel backend and dispatches them
 * to the websocket notification layer.
 */
export class AuditApplicabilityAspectRealtimeController {
  /**
   * Creates an instance of AuditApplicabilityAspectRealtimeController.
   *
   * @param notifier - Service responsible for dispatching realtime notifications.
   */
  constructor(private readonly notifier: AuditApplicabilityAspectNotifier) {}

  /**
   * Handles Audit Applicability Aspect realtime event requests.
   *
   * Expected flow:
   * 1. Validate incoming payload with Zod
   * 2. Forward the validated payload to the notifier
   * 3. Return a success response
   *
   * @param req - Express request
   * @param res - Express response
   * @param next - Express next middleware
   */
  handleAuditApplicabilityAspectEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditApplicabilityAspectSchema.parse(req.body);

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
