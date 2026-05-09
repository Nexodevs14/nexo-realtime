import { z } from 'zod';
import {
  AuditApplicabilityAspectEventType,
  AuditApplicabilityEventType,
} from '@/types/audit-applicability.types';

/**
 * Schema for Audit Applicability realtime event payload.
 */
export const AuditApplicabilitySchema = z.object({
  event: z.enum([
    AuditApplicabilityEventType.STARTED,
    AuditApplicabilityEventType.STATUS_CHANGED,
    AuditApplicabilityEventType.COMPLETED,
    AuditApplicabilityEventType.COMPLIANCE_SUBJECTS_GENERATED,
  ]),
  idAuditApplicability: z.number(),
  idAuditExecution: z.number(),
  status: z.number(),
  corporateId: z.number().nullable(),
  customerId: z.number(),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
});

/**
 * Schema for AuditApplicability export completed event.
 */
export const AuditApplicabilityExportCompletedSchema = z.object({
  userId: z.number(),
  auditApplicabilityId: z.number(),
  type: z.string(),
  name: z.string(),
  fileUrl: z.url(),
  clientSessionId: z.uuid(),
});

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
  systemUserIds: z.array(z.number().int().positive()).default([]),
});

export type AuditApplicabilityPayload = z.infer<typeof AuditApplicabilitySchema>;
export type AuditApplicabilityExportCompletedPayload = z.infer<
  typeof AuditApplicabilityExportCompletedSchema
>;
export type AuditApplicabilityAspectPayload = z.infer<typeof AuditApplicabilityAspectSchema>;
