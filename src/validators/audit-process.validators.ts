import { z } from 'zod';
import { AuditProcessEventType } from '@/types/audit-process.types';

/**
 * Schema for AuditProcess created event.
 */
export const AuditProcessSchema = z.object({
  idAuditProcess: z.number(),
  name: z.string(),
  event: z.enum([
    AuditProcessEventType.CREATED,
    AuditProcessEventType.UPDATED,
    AuditProcessEventType.STATUS_CHANGED,
    AuditProcessEventType.DELETED,
  ]),
  status: z.number(),
  customerId: z.number(),
  corporateIds: z.array(z.number()),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
});

/*
 * Payload for the audit_process.created event.
 */
export type AuditProcessPayload = z.infer<typeof AuditProcessSchema>;
