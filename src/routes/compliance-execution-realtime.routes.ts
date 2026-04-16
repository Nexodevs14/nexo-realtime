import { Router } from 'express';
import { ComplianceExecutionRealtimeController } from '@/controllers/compliance-execution-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Compliance Execution Realtime Routes.
 */
export function createComplianceExecutionRealtimeRoutes(
  controller: ComplianceExecutionRealtimeController
): Router {
  const router = Router();

  router.post('/compliance-execution/event', serviceAuth, controller.handleExecutionEvent);
  router.post(
    '/compliance-execution/audit-export-completed',
    serviceAuth,
    controller.handleExportCompleted
  );
  router.post('/compliance-execution-aspect/event', serviceAuth, controller.handleAspectEvent);
  router.post('/compliance-execution-subject/event', serviceAuth, controller.handleSubjectEvent);
  router.post(
    '/compliance-execution-subject-comment/event',
    serviceAuth,
    controller.handleCommentEvent
  );
  router.post('/compliance-evidence/event', serviceAuth, controller.handleEvidenceEvent);

  return router;
}
