/**
 * Zod schemas for Dashboard control panel realtime payloads.
 *
 * Field names mirror the Laravel Dashboard report export completed/failed DTOs
 * so the webhook contract stays a single source of truth.
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

/**
 * Schema for the control panel report export failure payload.
 */
export const DashboardReportExportFailedSchema = z.object({
  userId: z.number().int().positive(),
  clientSessionId: z.uuid(),
  name: z.string().min(1),
  message: z.string().min(1),
});

export type DashboardReportExportFailedPayload = z.infer<typeof DashboardReportExportFailedSchema>;
