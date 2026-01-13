import { Router } from "express";
import { LegalBasisRealtimeController } from "@/controllers/legal-basis-realtime.controller";
import { serviceAuth } from "@/middlewares/service-auth.middleware";

/**
 * Legal Basis Realtime Routes
 */
export function createLegalBasisRealtimeRoutes(
  controller: LegalBasisRealtimeController
): Router {
  const router = Router();

  router.post(
    "/legal-basis/export-completed",
    serviceAuth,
    controller.handleExportCompleted
  );

  return router;
}