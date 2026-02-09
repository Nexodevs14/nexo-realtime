import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { NotificationRealtimeNotifier } from '@/services/notification-realtime-notifier';
import { NotificationChangeSchema } from '@/validators/notification-realtime.validators';
import { ValidationError } from '@/errors/api.errors';
import { ApiResponse, ok } from '@/types/http.types';

/**
 * Notification Realtime Controller.
 */
export class NotificationRealtimeController {
  /**
   * NotificationRealtimeController constructor
   *
   * @param notifier Notification realtime notifier
   */
  constructor(private readonly notifier: NotificationRealtimeNotifier) {}

  /**
   * Handles notification change events.
   */
  handleNotificationChange = (
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): void => {
    try {
      const payload = NotificationChangeSchema.parse(req.body);
      this.notifier.notify(payload);
      ok(res, null, 'Notification realtime event dispatched');
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
