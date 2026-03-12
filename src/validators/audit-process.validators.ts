import { z } from 'zod';

/**
 * Schema for AuditProcess created event.
 */
export const AuditProcessSchema = z.object({
  idAuditProcess: z.number(),
  name: z.string(),
  status: z.number(),
  corporateIds: z.array(z.number()),
  actorId: z.number().int().positive(),
});

/*
 * Payload for the audit_process.created event.
 */
export type AuditProcessPayload = z.infer<typeof AuditProcessSchema>;
