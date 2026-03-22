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

export type AuditApplicabilityPayload = z.infer<typeof AuditApplicabilitySchema>;
