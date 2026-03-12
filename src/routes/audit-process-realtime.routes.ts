import { Router } from 'express';
import { AuditProcessRealtimeController } from '@/controllers/audit-process-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Audit Process Realtime Routes
 */
export function createAuditProcessRealtimeRoutes(
  controller: AuditProcessRealtimeController
): Router {
  const router = Router();

  router.post('/audit-process/event', serviceAuth, controller.handleAuditProcessEvent);

  return router;
}
