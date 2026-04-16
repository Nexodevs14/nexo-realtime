import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ValidationError } from '@/errors/api.errors';
import { ConditionalNotifier } from '@/services/conditional-notifier';
import { ApiResponse, ok } from '@/types/http.types';
import {
  ConditionalRequirementSchema,
  ConditionalSchema,
} from '@/validators/conditional.validators';

/**
 * Conditional Realtime Controller.
 *
 * Receives Conditional module events from the Laravel backend and dispatches
 * them to the websocket notification layer.
 */
export class ConditionalRealtimeController {
  /**
   * Creates an instance of ConditionalRealtimeController.
   *
   * @param notifier - Service responsible for dispatching realtime notifications.
   */
  constructor(private readonly notifier: ConditionalNotifier) {}

  /**
   * Handles Conditional CRUD realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleConditionalEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ConditionalSchema.parse(req.body);
      this.notifier.notifyConditional(payload);
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
   * Handles Conditional Requirement CRUD realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleConditionalRequirementEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ConditionalRequirementSchema.parse(req.body);
      this.notifier.notifyConditionalRequirement(payload);
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
