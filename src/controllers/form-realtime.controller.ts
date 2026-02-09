import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { FormDuplicatedSchema } from '@/validators/form.validators';
import { FormDuplicatedNotifier } from '@/services/form-duplicated-notifier';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Form Realtime Controller.
 *
 * Handles realtime events related to Forms.
 * @param notifier - Notifier for form duplicated events.
 */
export class FormRealtimeController {
  constructor(private readonly notifier: FormDuplicatedNotifier) {}

  /**
   * Handles Form duplicated realtime event.
   */
  handleDuplicated = (req: Request, res: Response<ApiResponse<null>>, next: NextFunction): void => {
    try {
      const payload = FormDuplicatedSchema.parse(req.body);
      this.notifier.notify(payload);
      ok(res, null, 'Form duplicated realtime dispatched');
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
