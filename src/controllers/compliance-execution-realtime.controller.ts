import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ValidationError } from '@/errors/api.errors';
import { ComplianceExecutionRealtimeNotifier } from '@/services/compliance-execution-realtime-notifier';
import { ComplianceExecutionExportNotifier } from '@/services/compliance-execution-export-notifier';
import { ApiResponse, ok } from '@/types/http.types';
import {
  ComplianceEvidenceSchema,
  ComplianceExecutionAspectSchema,
  ComplianceExecutionExportCompletedSchema,
  ComplianceExecutionSchema,
  ComplianceExecutionSubjectCommentSchema,
  ComplianceExecutionSubjectSchema,
} from '@/validators/compliance-execution.validators';

/**
 * Compliance Execution Realtime Controller.
 *
 * Receives events from the Laravel backend and dispatches them
 * to the websocket notification layer.
 */
export class ComplianceExecutionRealtimeController {
  /**
   * Creates an instance of ComplianceExecutionRealtimeController.
   *
   * @param notifier - Service responsible for dispatching operational realtime notifications.
   * @param exportNotifier - Service responsible for dispatching export completion notifications.
   */
  constructor(
    private readonly notifier: ComplianceExecutionRealtimeNotifier,
    private readonly exportNotifier: ComplianceExecutionExportNotifier
  ) {}

  /**
   * Handles Compliance Execution lifecycle realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleExecutionEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ComplianceExecutionSchema.parse(req.body);
      this.notifier.notifyExecution(payload);
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
   * Handles Compliance Execution Aspect realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleAspectEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ComplianceExecutionAspectSchema.parse(req.body);
      this.notifier.notifyAspect(payload);
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
   * Handles Compliance Execution Subject realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleSubjectEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ComplianceExecutionSubjectSchema.parse(req.body);
      this.notifier.notifySubject(payload);
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
   * Handles Compliance Execution Subject Comment realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleCommentEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ComplianceExecutionSubjectCommentSchema.parse(req.body);
      this.notifier.notifyComment(payload);
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
   * Handles Compliance Evidence realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleEvidenceEvent = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ComplianceEvidenceSchema.parse(req.body);
      this.notifier.notifyEvidence(payload);
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
   * Handles Compliance Execution export completed realtime event requests.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Express next middleware.
   */
  handleExportCompleted = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = ComplianceExecutionExportCompletedSchema.parse(req.body);
      this.exportNotifier.notify(payload);
      ok(res, null, 'Realtime export notification dispatched');
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
