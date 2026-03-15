import { z } from 'zod';
import { AuditExecutionEventType } from '@/types/audit-execution.types';

/**
 * Schema for Audit Execution realtime event payload.
 * idCorporate is required; emission is always to corporate:{idCorporate}.
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
  idCorporate: z.number().int().positive(),
  periodStart: z.string(),
  periodEnd: z.string(),
  actorId: z.number().int().positive(),
});

export type AuditExecutionPayload = z.infer<typeof AuditExecutionSchema>;
