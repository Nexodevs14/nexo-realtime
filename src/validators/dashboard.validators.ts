/**
 * Zod schemas for Dashboard control panel realtime payloads.
 *
 * Field names mirror {@see DashboardReportExportCompletedDTO::toArray()} in the Laravel
 * backend so the webhook contract stays a single source of truth.
 */
import { z } from 'zod';

/**
 * Schema for the control panel report export completion payload.
 */
export const DashboardReportExportCompletedSchema = z.object({
  userId: z.number().int().positive(),
  clientSessionId: z.uuid(),
  fileUrl: z.url(),
  name: z.string().min(1),
  filename: z.string().min(1),
});

export type DashboardReportExportCompletedPayload = z.infer<
  typeof DashboardReportExportCompletedSchema
>;
