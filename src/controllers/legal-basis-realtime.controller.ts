import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { LegalBasisExportNotifier } from '@/services/legal-basis-export-notifier';
import { LegalBasisExportCompletedSchema } from '@/validators/legal-basis.validators';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Legal Basis Realtime Controller.
 */
export class LegalBasisRealtimeController {
  /**
   * LegalBasisRealtimeController Constructor.
   *
   * @param notifier - Legal Basis export notifier.
   */
  constructor(private readonly notifier: LegalBasisExportNotifier) {}

  /**
   * Handles Legal Basis export completed event.
   */
  handleExportCompleted = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = LegalBasisExportCompletedSchema.parse(req.body);
      this.notifier.notify(payload);
      ok(res, null, 'Realtime notification dispatched');
    } catch (error) {
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
