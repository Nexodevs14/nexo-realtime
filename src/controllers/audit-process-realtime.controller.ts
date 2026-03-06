import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AuditProcessCreatedNotifier } from '@/services/audit-process-created-notifier';
import { AuditProcessUpdatedNotifier } from '@/services/audit-process-updated-notifier';
import { AuditProcessStatusChangedNotifier } from '@/services/audit-process-status-changed-notifier';
import { AuditProcessDeletedNotifier } from '@/services/audit-process-deleted-notifier';
import { AuditProcessSchema } from '@/validators/audit-process.validators';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Audit Process Realtime Controller.
 */
export class AuditProcessRealtimeController {
  /**
   * Creates an instance of AuditProcessRealtimeController.
   */
  constructor(
    private readonly createdNotifier: AuditProcessCreatedNotifier,
    private readonly updatedNotifier: AuditProcessUpdatedNotifier,
    private readonly statusChangedNotifier: AuditProcessStatusChangedNotifier,
    private readonly deletedNotifier: AuditProcessDeletedNotifier
  ) {}

  /**
   * Handles Audit Process created event.
   */
  handleAuditProcessCreated = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditProcessSchema.parse(req.body);
      this.createdNotifier.notify(payload);
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
   * Handles Audit Process updated event.
   */
  handleAuditProcessUpdated = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditProcessSchema.parse(req.body);
      this.updatedNotifier.notify(payload);
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
   * Handles Audit Process status changed event.
   */
  handleAuditProcessStatusChanged = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditProcessSchema.parse(req.body);
      this.statusChangedNotifier.notify(payload);
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
   * Handles Audit Process deleted event.
   */
  handleAuditProcessDeleted = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = AuditProcessSchema.parse(req.body);
      this.deletedNotifier.notify(payload);
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
