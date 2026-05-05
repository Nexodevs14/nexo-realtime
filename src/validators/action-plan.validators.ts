import { z } from 'zod';
import {
  ComplianceActionPlanEventType,
  ComplianceActionPlanTaskCommentEventType,
  ComplianceActionPlanTaskEventType,
} from '@/types/action-plan.types';

/**
 * Schema for Action Plan lifecycle realtime event payloads.
 */
export const ComplianceActionPlanSchema = z.object({
  event: z.enum([
    ComplianceActionPlanEventType.STARTED,
    ComplianceActionPlanEventType.UPDATED,
    ComplianceActionPlanEventType.STATUS_CHANGED,
    ComplianceActionPlanEventType.COMPLETED,
  ]),
  idComplianceActionPlan: z.number().int().positive(),
  idComplianceExecution: z.number().int().positive(),
  idAuditExecution: z.number().int().positive(),
  status: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
});

/**
 * Schema for Action Plan task realtime event payloads.
 */
export const ComplianceActionPlanTaskSchema = z.object({
  event: z.enum([
    ComplianceActionPlanTaskEventType.CREATED,
    ComplianceActionPlanTaskEventType.UPDATED,
    ComplianceActionPlanTaskEventType.STATUS_CHANGED,
  ]),
  idComplianceActionPlanTask: z.number().int().positive(),
  idComplianceActionPlanItem: z.number().int().positive(),
  idComplianceActionPlan: z.number().int().positive(),
  idComplianceExecution: z.number().int().positive(),
  idAuditExecution: z.number().int().positive(),
  parentTaskId: z.number().int().positive().nullable(),
  status: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
});

/**
 * Schema for Action Plan task comment realtime event payloads.
 */
export const ComplianceActionPlanTaskCommentSchema = z.object({
  event: z.enum([
    ComplianceActionPlanTaskCommentEventType.CREATED,
    ComplianceActionPlanTaskCommentEventType.UPDATED,
    ComplianceActionPlanTaskCommentEventType.DELETED,
  ]),
  idComplianceActionPlanTaskComment: z.number().int().positive().nullable(),
  idComplianceActionPlanTask: z.number().int().positive(),
  idComplianceActionPlanItem: z.number().int().positive(),
  idComplianceActionPlan: z.number().int().positive(),
  idComplianceExecution: z.number().int().positive(),
  idAuditExecution: z.number().int().positive(),
  idUser: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
  systemUserIds: z.array(z.number().int().positive()).default([]),
});

export type ComplianceActionPlanPayload = z.infer<typeof ComplianceActionPlanSchema>;
export type ComplianceActionPlanTaskPayload = z.infer<typeof ComplianceActionPlanTaskSchema>;
export type ComplianceActionPlanTaskCommentPayload = z.infer<
  typeof ComplianceActionPlanTaskCommentSchema
>;
