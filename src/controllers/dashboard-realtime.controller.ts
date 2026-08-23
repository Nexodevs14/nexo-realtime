import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ValidationError } from '@/errors/api.errors';
import { DashboardExportNotifier } from '@/services/dashboard-export-notifier';
import { ApiResponse, ok } from '@/types/http.types';
import {
  DashboardReportExportCompletedSchema,
  DashboardReportExportFailedSchema,
} from '@/validators/dashboard.validators';

/**
 * Dashboard Realtime Controller.
 *
 * Receives service-authenticated webhooks from Laravel and dispatches them to the
 * Socket.IO notification layer. Browser clients never call these HTTP routes.
 */
export class DashboardRealtimeController {
  /**
   * @param exportNotifier - Service responsible for dispatching control panel export outcomes.
   */
  constructor(private readonly exportNotifier: DashboardExportNotifier) {}

  /**
   * Handles control panel report export completed realtime event requests.
   */
  handleExportCompleted = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = DashboardReportExportCompletedSchema.parse(req.body);
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

  /**
   * Handles control panel report export failed realtime event requests.
   */
  handleExportFailed = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = DashboardReportExportFailedSchema.parse(req.body);
      this.exportNotifier.notifyFailed(payload);
      ok(res, null, 'Realtime export failure notification dispatched');
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
