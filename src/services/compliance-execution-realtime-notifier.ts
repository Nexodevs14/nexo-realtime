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
  /**
   * Creates an instance of ComplianceExecutionRealtimeNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies subscribed clients about a Compliance Execution lifecycle event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyExecution(payload: ComplianceExecutionPayload): void {
    const event = this.mapExecutionEvent(payload.event);
    if (payload.corporateId !== null) {
      const room = `corporate:${payload.corporateId}`;
      this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      return;
    }

    const room = `customer:${payload.customerId}`;
    this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
  }

  /**
   * Notifies subscribed clients about a Compliance Execution Aspect event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyAspect(payload: ComplianceExecutionAspectPayload): void {
    const event = this.mapAspectEvent(payload.event);
    if (payload.corporateId !== null) {
      const room = `corporate:${payload.corporateId}`;
      this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      return;
    }

    const room = `customer:${payload.customerId}`;
    this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
  }

  /**
   * Notifies subscribed clients about a Compliance Execution Subject event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifySubject(payload: ComplianceExecutionSubjectPayload): void {
    const event = this.mapSubjectEvent(payload.event);
    if (payload.corporateId !== null) {
      const room = `corporate:${payload.corporateId}`;
      this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      return;
    }

    const room = `customer:${payload.customerId}`;
    this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
  }

  /**
   * Notifies subscribed clients about a Compliance Execution Subject Comment event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyComment(payload: ComplianceExecutionSubjectCommentPayload): void {
    const event = this.mapCommentEvent(payload.event);
    if (payload.corporateId !== null) {
      const room = `corporate:${payload.corporateId}`;
      this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      return;
    }

    const room = `customer:${payload.customerId}`;
    this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
  }

  /**
   * Notifies subscribed clients about a Compliance Evidence event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyEvidence(payload: ComplianceEvidencePayload): void {
    const event = this.mapEvidenceEvent(payload.event);
    if (payload.corporateId !== null) {
      const room = `corporate:${payload.corporateId}`;
      this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      return;
    }

    const room = `customer:${payload.customerId}`;
    this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
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
      [ComplianceEvidenceEventType.DELETED]: RealtimeEventEnum.COMPLIANCE_EVIDENCE_DELETED,
    };

    return map[type];
  }
}
