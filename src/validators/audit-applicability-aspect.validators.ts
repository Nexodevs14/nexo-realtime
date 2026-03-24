import { z } from 'zod';
import { AuditApplicabilityAspectEventType } from '@/types/audit-applicability-aspect.types';

/**
 * Schema for Audit Applicability Aspect realtime event payload.
 *
 * This payload is sent by the Laravel backend to the Node realtime service.
 */
export const AuditApplicabilityAspectSchema = z.object({
  event: z.enum([
    AuditApplicabilityAspectEventType.STATUS_CHANGED,
    AuditApplicabilityAspectEventType.UPDATED,
  ]),
  idAuditApplicabilityAspect: z.number().int().positive(),
  idAuditApplicability: z.number().int().positive(),
  idAuditExecution: z.number().int().positive(),
  status: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
});

/**
 * Type inferred from AuditApplicabilityAspectSchema.
 */
export type AuditApplicabilityAspectPayload = z.infer<typeof AuditApplicabilityAspectSchema>;
