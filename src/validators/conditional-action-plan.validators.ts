import { z } from 'zod';
import {
  ConditionalActionPlanEventType,
  ConditionalActionPlanTaskCommentEventType,
  ConditionalActionPlanTaskEvidenceEventType,
  ConditionalActionPlanTaskEventType,
} from '@/types/conditional-action-plan.types';

/**
 * Schema for Conditional Action Plan lifecycle realtime event payloads.
 */
export const ConditionalActionPlanSchema = z.object({
  event: z.enum([
    ConditionalActionPlanEventType.STARTED,
    ConditionalActionPlanEventType.UPDATED,
    ConditionalActionPlanEventType.STATUS_CHANGED,
    ConditionalActionPlanEventType.COMPLETED,
  ]),
  idConditionalActionPlan: z.number().int().positive(),
  idConditional: z.number().int().positive(),
  status: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive().nullable(),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
  includeActor: z.boolean().optional().default(false),
});

/**
 * Schema for Conditional Action Plan generated-file completion payloads.
 */
export const ConditionalActionPlanExportCompletedSchema = z.object({
  userId: z.number().int().positive(),
  idConditionalActionPlan: z.number().int().positive(),
  fileUrl: z.url(),
  name: z.string().min(1),
  clientSessionId: z.uuid(),
});

/**
 * Schema for Conditional Action Plan task realtime event payloads.
 */
export const ConditionalActionPlanTaskSchema = z.object({
  event: z.enum([
    ConditionalActionPlanTaskEventType.CREATED,
    ConditionalActionPlanTaskEventType.UPDATED,
    ConditionalActionPlanTaskEventType.STATUS_CHANGED,
  ]),
  idConditionalActionPlanTask: z.number().int().positive(),
  idConditionalActionPlanItem: z.number().int().positive(),
  idConditionalActionPlan: z.number().int().positive(),
  idConditional: z.number().int().positive(),
  parentTaskId: z.number().int().positive().nullable(),
  status: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive().nullable(),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
  includeActor: z.boolean().optional().default(false),
});

/**
 * Schema for Conditional Action Plan task comment realtime event payloads.
 */
export const ConditionalActionPlanTaskCommentSchema = z.object({
  event: z.enum([
    ConditionalActionPlanTaskCommentEventType.CREATED,
    ConditionalActionPlanTaskCommentEventType.UPDATED,
    ConditionalActionPlanTaskCommentEventType.DELETED,
  ]),
  idConditionalActionPlanTaskComment: z.number().int().positive().nullable(),
  idConditionalActionPlanTask: z.number().int().positive(),
  idConditionalActionPlanItem: z.number().int().positive(),
  idConditionalActionPlan: z.number().int().positive(),
  idConditional: z.number().int().positive(),
  idUser: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive().nullable(),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
  includeActor: z.boolean().optional().default(false),
});

/**
 * Schema for Conditional Action Plan task evidence realtime event payloads.
 */
export const ConditionalActionPlanTaskEvidenceSchema = z.object({
  event: z.enum([
    ConditionalActionPlanTaskEvidenceEventType.CREATED,
    ConditionalActionPlanTaskEvidenceEventType.UPDATED,
    ConditionalActionPlanTaskEvidenceEventType.DELETED,
  ]),
  idConditionalActionPlanTaskEvidence: z.number().int().positive().nullable(),
  idConditionalActionPlanTask: z.number().int().positive(),
  idConditionalActionPlanItem: z.number().int().positive(),
  idConditionalActionPlan: z.number().int().positive(),
  idConditional: z.number().int().positive(),
  idEvidenceType: z.number().int().positive().nullable(),
  declaredNoDocument: z.boolean(),
  isCurrent: z.boolean(),
  renewalNumber: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive().nullable(),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
  includeActor: z.boolean().optional().default(false),
});

export type ConditionalActionPlanPayload = z.infer<typeof ConditionalActionPlanSchema>;
export type ConditionalActionPlanExportCompletedPayload = z.infer<
  typeof ConditionalActionPlanExportCompletedSchema
>;
export type ConditionalActionPlanTaskPayload = z.infer<typeof ConditionalActionPlanTaskSchema>;
export type ConditionalActionPlanTaskCommentPayload = z.infer<
  typeof ConditionalActionPlanTaskCommentSchema
>;
export type ConditionalActionPlanTaskEvidencePayload = z.infer<
  typeof ConditionalActionPlanTaskEvidenceSchema
>;
