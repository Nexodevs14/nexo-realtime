import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ValidationError } from '@/errors/api.errors';
import { ComplianceActionPlanRealtimeNotifier } from '@/services/action-plan-realtime-notifier';
import { ApiResponse, ok } from '@/types/http.types';
import {
  ComplianceActionPlanSchema,
  ComplianceActionPlanTaskCommentSchema,
  ComplianceActionPlanTaskSchema,
} from '@/validators/action-plan.validators';

/**
 * Action Plan Realtime Controller.
 *
 * Receives events from the Laravel backend and dispatches them
 * to the websocket notification layer.
 */
export class ComplianceActionPlanRealtimeController {
  /**
   * Creates an instance of ComplianceActionPlanRealtimeController.
   *
   * @param notifier - Service responsible for dispatching action-plan realtime notifications.
   */
  constructor(private readonly notifier: ComplianceActionPlanRealtimeNotifier) {}

  /**
   * Handles Action Plan lifecycle realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleActionPlanEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ComplianceActionPlanSchema.parse(req.body);
      this.notifier.notifyActionPlan(payload);
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
   * Handles Action Plan task realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleTaskEvent = (req: Request, res: Response<ApiResponse<null>>, next: NextFunction): void => {
    try {
      const payload = ComplianceActionPlanTaskSchema.parse(req.body);
      this.notifier.notifyTask(payload);
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
   * Handles Action Plan task comment realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleTaskCommentEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ComplianceActionPlanTaskCommentSchema.parse(req.body);
      this.notifier.notifyTaskComment(payload);
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
