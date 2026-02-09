import { Router } from 'express';
import { NotificationRealtimeController } from '@/controllers/notification-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Notification Realtime Routes
 */
export function createNotificationRealtimeRoutes(
  controller: NotificationRealtimeController
): Router {
  const router = Router();

  router.post('/notifications/updated', serviceAuth, controller.handleNotificationChange);

  return router;
}
