import { RealtimeEventEnum } from '@/enums/realtime-events';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import {
  ComplianceEvidencePayload,
  ComplianceExecutionAspectPayload,
  ComplianceExecutionPayload,
  ComplianceExecutionSubjectCommentPayload,
  ComplianceExecutionSubjectPayload,
} from '@/validators/compliance-execution.validators';
import {
  ComplianceEvidenceEventType,
  ComplianceExecutionAspectEventType,
  ComplianceExecutionEventType,
  ComplianceExecutionSubjectCommentEventType,
  ComplianceExecutionSubjectEventType,
} from '@/types/compliance-execution.types';
import { ScopedRealtimeAudienceNotifier } from '@/services/scoped-realtime-audience-notifier';

/**
 * Handles realtime notification for Compliance Execution related events.
 *
 * Broadcast strategy:
 * - If corporateId is present, emits to room: corporate:{corporateId}
 * - Otherwise, falls back to room: customer:{customerId}
 *
 * The actor user is excluded from the broadcast.
 */
export class ComplianceExecutionRealtimeNotifier {
  private readonly audienceNotifier: ScopedRealtimeAudienceNotifier;

  /**
   * Creates an instance of ComplianceExecutionRealtimeNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(realtimeGateway: RealtimeGateway) {
    this.audienceNotifier = new ScopedRealtimeAudienceNotifier(realtimeGateway);
  }

  /**
   * Notifies subscribed clients about a Compliance Execution lifecycle event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyExecution(payload: ComplianceExecutionPayload): void {
    const event = this.mapExecutionEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about a Compliance Execution Aspect event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyAspect(payload: ComplianceExecutionAspectPayload): void {
    const event = this.mapAspectEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about a Compliance Execution Subject event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifySubject(payload: ComplianceExecutionSubjectPayload): void {
    const event = this.mapSubjectEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about a Compliance Execution Subject Comment event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyComment(payload: ComplianceExecutionSubjectCommentPayload): void {
    const event = this.mapCommentEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about a Compliance Evidence event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyEvidence(payload: ComplianceEvidencePayload): void {
    const event = this.mapEvidenceEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Maps Compliance Execution lifecycle event types to websocket event names.
   */
  private mapExecutionEvent(type: ComplianceExecutionEventType): RealtimeEventEnum {
    const map: Record<ComplianceExecutionEventType, RealtimeEventEnum> = {
      [ComplianceExecutionEventType.STARTED]: RealtimeEventEnum.COMPLIANCE_EXECUTION_STARTED,
      [ComplianceExecutionEventType.STATUS_CHANGED]:
        RealtimeEventEnum.COMPLIANCE_EXECUTION_STATUS_CHANGED,
      [ComplianceExecutionEventType.COMPLETED]: RealtimeEventEnum.COMPLIANCE_EXECUTION_COMPLETED,
    };

    return map[type];
  }

  /**
   * Maps Compliance Execution Aspect event types to websocket event names.
   */
  private mapAspectEvent(type: ComplianceExecutionAspectEventType): RealtimeEventEnum {
    const map: Record<ComplianceExecutionAspectEventType, RealtimeEventEnum> = {
      [ComplianceExecutionAspectEventType.STATUS_CHANGED]:
        RealtimeEventEnum.COMPLIANCE_EXECUTION_ASPECT_STATUS_CHANGED,
    };

    return map[type];
  }

  /**
   * Maps Compliance Execution Subject event types to websocket event names.
   */
  private mapSubjectEvent(type: ComplianceExecutionSubjectEventType): RealtimeEventEnum {
    const map: Record<ComplianceExecutionSubjectEventType, RealtimeEventEnum> = {
      [ComplianceExecutionSubjectEventType.STATUS_CHANGED]:
        RealtimeEventEnum.COMPLIANCE_EXECUTION_SUBJECT_STATUS_CHANGED,
    };

    return map[type];
  }

  /**
   * Maps Compliance Execution Subject Comment event types to websocket event names.
   */
  private mapCommentEvent(type: ComplianceExecutionSubjectCommentEventType): RealtimeEventEnum {
    const map: Record<ComplianceExecutionSubjectCommentEventType, RealtimeEventEnum> = {
      [ComplianceExecutionSubjectCommentEventType.CREATED]:
        RealtimeEventEnum.COMPLIANCE_EXECUTION_SUBJECT_COMMENT_CREATED,
      [ComplianceExecutionSubjectCommentEventType.UPDATED]:
        RealtimeEventEnum.COMPLIANCE_EXECUTION_SUBJECT_COMMENT_UPDATED,
      [ComplianceExecutionSubjectCommentEventType.DELETED]:
        RealtimeEventEnum.COMPLIANCE_EXECUTION_SUBJECT_COMMENT_DELETED,
    };

    return map[type];
  }

  /**
   * Maps Compliance Evidence event types to websocket event names.
   */
  private mapEvidenceEvent(type: ComplianceEvidenceEventType): RealtimeEventEnum {
    const map: Record<ComplianceEvidenceEventType, RealtimeEventEnum> = {
      [ComplianceEvidenceEventType.CREATED]: RealtimeEventEnum.COMPLIANCE_EVIDENCE_CREATED,
      [ComplianceEvidenceEventType.STATUS_CHANGED]:
        RealtimeEventEnum.COMPLIANCE_EVIDENCE_STATUS_CHANGED,
      [ComplianceEvidenceEventType.UPDATED]: RealtimeEventEnum.COMPLIANCE_EVIDENCE_UPDATED,
      [ComplianceEvidenceEventType.DELETED]: RealtimeEventEnum.COMPLIANCE_EVIDENCE_DELETED,
    };

    return map[type];
  }
}
