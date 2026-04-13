import { Router } from 'express';
import { AuditApplicabilityRealtimeController } from '@/controllers/audit-applicability-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Audit Applicability Realtime Routes
 */
export function createAuditApplicabilityRealtimeRoutes(
  controller: AuditApplicabilityRealtimeController
): Router {
  const router = Router();

  router.post('/audit-applicability/event', serviceAuth, controller.handleAuditApplicabilityEvent);
  router.post(
    '/audit-applicability/export-completed',
    serviceAuth,
    controller.handleExportCompleted
  );
  router.post(
    '/audit-applicability-aspect/event',
    serviceAuth,
    controller.handleAuditApplicabilityAspectEvent
  );

  return router;
}
