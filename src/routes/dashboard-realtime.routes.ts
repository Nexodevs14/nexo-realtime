import { Router } from 'express';
import { DashboardRealtimeController } from '@/controllers/dashboard-realtime.controller';
import { serviceAuth } from '@/middlewares/service-auth.middleware';

/**
 * Dashboard Realtime Routes.
 *
 * Mounted under `/api/v1/realtime`. Authenticated with the shared service token —
 * these are not browser-facing REST endpoints.
 */
export function createDashboardRealtimeRoutes(controller: DashboardRealtimeController): Router {
  const router = Router();

  router.post('/dashboard/report-export-completed', serviceAuth, controller.handleExportCompleted);

  return router;
}
