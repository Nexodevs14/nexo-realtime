import { z } from 'zod';
import { AuditApplicabilityEventType } from '@/types/audit-applicability.types';

/**
 * Schema for Audit Applicability realtime event payload.
 */
export const AuditApplicabilitySchema = z.object({
  event: z.enum([AuditApplicabilityEventType.STARTED, AuditApplicabilityEventType.STATUS_CHANGED]),
  idAuditApplicability: z.number(),
  idAuditExecution: z.number(),
  status: z.number(),
  corporateId: z.number().nullable(),
  customerId: z.number(),
  actorId: z.number().int().positive(),
});

/**
 * Schema for AuditApplicability export completed event.
 */
export const AuditApplicabilityExportCompletedSchema = z.object({
  userId: z.number(),
  auditApplicabilityId: z.number(),
  type: z.string(),
  fileUrl: z.url(),
});

export type AuditApplicabilityPayload = z.infer<typeof AuditApplicabilitySchema>;
export type AuditApplicabilityExportCompletedPayload = z.infer<
  typeof AuditApplicabilityExportCompletedSchema
>;
