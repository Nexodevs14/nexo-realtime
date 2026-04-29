import { z } from 'zod';
import {
  ComplianceEvidenceEventType,
  ComplianceExecutionAspectEventType,
  ComplianceExecutionEventType,
  ComplianceExecutionSubjectCommentEventType,
  ComplianceExecutionSubjectEventType,
} from '@/types/compliance-execution.types';

/**
 * Schema for Compliance Execution lifecycle realtime event payloads.
 */
export const ComplianceExecutionSchema = z.object({
  event: z.enum([
    ComplianceExecutionEventType.STARTED,
    ComplianceExecutionEventType.STATUS_CHANGED,
    ComplianceExecutionEventType.COMPLETED,
  ]),
  idComplianceExecution: z.number().int().positive(),
  idAuditExecution: z.number().int().positive(),
  idExecutionType: z.number().int().positive(),
  status: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
});

/**
 * Schema for Compliance Execution Aspect realtime event payloads.
 */
export const ComplianceExecutionAspectSchema = z.object({
  event: z.enum([ComplianceExecutionAspectEventType.STATUS_CHANGED]),
  idComplianceExecutionAspect: z.number().int().positive(),
  idComplianceExecution: z.number().int().positive(),
  idAuditExecution: z.number().int().positive(),
  idMatter: z.number().int().positive(),
  idAspect: z.number().int().positive(),
  status: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
});

/**
 * Schema for Compliance Execution Subject realtime event payloads.
 */
export const ComplianceExecutionSubjectSchema = z.object({
  event: z.enum([ComplianceExecutionSubjectEventType.STATUS_CHANGED]),
  idComplianceExecutionSubject: z.number().int().positive(),
  idComplianceExecution: z.number().int().positive(),
  idComplianceExecutionAspect: z.number().int().positive().nullable(),
  idComplianceSubject: z.number().int().positive(),
  idAuditExecution: z.number().int().positive(),
  status: z.number().int().positive().nullable(),
  isEvaluated: z.boolean().nullable(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
});

/**
 * Schema for Compliance Execution Subject Comment realtime event payloads.
 */
export const ComplianceExecutionSubjectCommentSchema = z.object({
  event: z.enum([
    ComplianceExecutionSubjectCommentEventType.CREATED,
    ComplianceExecutionSubjectCommentEventType.UPDATED,
    ComplianceExecutionSubjectCommentEventType.DELETED,
  ]),
  idComplianceExecutionSubjectComment: z.number().int().positive().nullable(),
  idComplianceExecutionSubject: z.number().int().positive(),
  idComplianceExecution: z.number().int().positive(),
  idComplianceExecutionAspect: z.number().int().positive().nullable(),
  idAuditExecution: z.number().int().positive(),
  idUser: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
});

/**
 * Schema for Compliance Evidence realtime event payloads.
 */
export const ComplianceEvidenceSchema = z.object({
  event: z.enum([
    ComplianceEvidenceEventType.CREATED,
    ComplianceEvidenceEventType.STATUS_CHANGED,
    ComplianceEvidenceEventType.UPDATED,
    ComplianceEvidenceEventType.DELETED,
  ]),
  idComplianceEvidence: z.number().int().positive().nullable(),
  idComplianceSubject: z.number().int().positive(),
  idComplianceExecutionSubject: z.number().int().positive(),
  idComplianceExecution: z.number().int().positive(),
  idComplianceExecutionAspect: z.number().int().positive().nullable(),
  idAuditExecution: z.number().int().positive(),
  status: z.number().int().positive(),
  corporateId: z.number().int().positive().nullable(),
  customerId: z.number().int().positive(),
  actorId: z.number().int().positive(),
});

/**
 * Schema for Compliance Execution export completed event payloads.
 */
export const ComplianceExecutionExportCompletedSchema = z.object({
  userId: z.number().int().positive(),
  idComplianceExecution: z.number().int().positive(),
  type: z.string().min(1),
  name: z.string().min(1),
  fileUrl: z.url(),
  clientSessionId: z.uuid(),
});

export type ComplianceExecutionPayload = z.infer<typeof ComplianceExecutionSchema>;
export type ComplianceExecutionAspectPayload = z.infer<typeof ComplianceExecutionAspectSchema>;
export type ComplianceExecutionSubjectPayload = z.infer<typeof ComplianceExecutionSubjectSchema>;
export type ComplianceExecutionSubjectCommentPayload = z.infer<
  typeof ComplianceExecutionSubjectCommentSchema
>;
export type ComplianceEvidencePayload = z.infer<typeof ComplianceEvidenceSchema>;
export type ComplianceExecutionExportCompletedPayload = z.infer<
  typeof ComplianceExecutionExportCompletedSchema
>;
