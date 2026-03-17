import { z } from 'zod';
import { AuditExecutionEventType } from '@/types/audit-execution.types';

/**
 * Schema for Audit Execution realtime event payload.
 */
export const AuditExecutionSchema = z.object({
  event: z.enum([
    AuditExecutionEventType.CREATED,
    AuditExecutionEventType.UPDATED,
    AuditExecutionEventType.STATUS_CHANGED,
    AuditExecutionEventType.DELETED,
  ]),
  idAuditExecution: z.number(),
  idAuditProcess: z.number(),
  status: z.number(),
  corporateId: z.number().nullable(),
  customerId: z.number(),
  actorId: z.number().int().positive(),
});

export type AuditExecutionPayload = z.infer<typeof AuditExecutionSchema>;
