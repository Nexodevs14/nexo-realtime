import { z } from 'zod';
import { ConditionalEventType, ConditionalRequirementEventType } from '@/types/conditional.types';

/**
 * Schema for Conditional CRUD realtime event payloads.
 */
export const ConditionalSchema = z.object({
  event: z.enum([
    ConditionalEventType.CREATED,
    ConditionalEventType.UPDATED,
    ConditionalEventType.DELETED,
  ]),
  id: z.number().int().positive().nullable(),
  name: z.string().min(1),
  matterId: z.number().int().positive(),
  aspectId: z.number().int().positive(),
  customerId: z.number().int().positive().nullable(),
  corporateId: z.number().int().positive().nullable(),
  actorId: z.number().int().positive(),
});

/**
 * Schema for Conditional Requirement CRUD realtime event payloads.
 */
export const ConditionalRequirementSchema = z.object({
  event: z.enum([
    ConditionalRequirementEventType.CREATED,
    ConditionalRequirementEventType.UPDATED,
    ConditionalRequirementEventType.DELETED,
  ]),
  idConditionalRequirement: z.number().int().positive().nullable(),
  conditionalId: z.number().int().positive().nullable(),
  applicationTypeId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive().nullable(),
  corporateId: z.number().int().positive().nullable(),
  number: z.string().min(1),
  name: z.string().min(1),
  actorId: z.number().int().positive(),
});

export type ConditionalPayload = z.infer<typeof ConditionalSchema>;
export type ConditionalRequirementPayload = z.infer<typeof ConditionalRequirementSchema>;
