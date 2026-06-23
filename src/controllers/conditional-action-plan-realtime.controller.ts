import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ValidationError } from '@/errors/api.errors';
import { ConditionalActionPlanRealtimeNotifier } from '@/services/conditional-action-plan-realtime-notifier';
import { ApiResponse, ok } from '@/types/http.types';
import {
  ConditionalActionPlanSchema,
  ConditionalActionPlanTaskCommentSchema,
  ConditionalActionPlanTaskEvidenceSchema,
  ConditionalActionPlanTaskSchema,
} from '@/validators/conditional-action-plan.validators';

/**
 * Conditional Action Plan Realtime Controller.
 *
 * Receives events from the Laravel backend and dispatches them
 * to the websocket notification layer.
 */
export class ConditionalActionPlanRealtimeController {
  /**
   * Creates an instance of ConditionalActionPlanRealtimeController.
   *
   * @param notifier - Service responsible for dispatching Conditional Action Plan realtime notifications.
   */
  constructor(private readonly notifier: ConditionalActionPlanRealtimeNotifier) {}

  /**
   * Handles Conditional Action Plan lifecycle realtime event requests.
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
      const payload = ConditionalActionPlanSchema.parse(req.body);
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
   * Handles Conditional Action Plan task realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleTaskEvent = (req: Request, res: Response<ApiResponse<null>>, next: NextFunction): void => {
    try {
      const payload = ConditionalActionPlanTaskSchema.parse(req.body);
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
   * Handles Conditional Action Plan task comment realtime event requests.
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
      const payload = ConditionalActionPlanTaskCommentSchema.parse(req.body);
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

  /**
   * Handles Conditional Action Plan task evidence realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleTaskEvidenceEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ConditionalActionPlanTaskEvidenceSchema.parse(req.body);
      this.notifier.notifyTaskEvidence(payload);
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
