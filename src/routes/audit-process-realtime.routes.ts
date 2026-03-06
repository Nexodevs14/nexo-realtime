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

  router.post('/audit-process/created', serviceAuth, controller.handleAuditProcessCreated);

  router.post('/audit-process/updated', serviceAuth, controller.handleAuditProcessUpdated);

  router.post(
    '/audit-process/status-changed',
    serviceAuth,
    controller.handleAuditProcessStatusChanged
  );

  router.post('/audit-process/deleted', serviceAuth, controller.handleAuditProcessDeleted);

  return router;
}
