import { RealtimeEventEnum } from '@/enums/realtime-events';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { ScopedRealtimeAudienceNotifier } from '@/services/scoped-realtime-audience-notifier';
import {
  ConditionalActionPlanPayload,
  ConditionalActionPlanTaskCommentPayload,
  ConditionalActionPlanTaskEvidencePayload,
  ConditionalActionPlanTaskPayload,
} from '@/validators/conditional-action-plan.validators';
import {
  ConditionalActionPlanEventType,
  ConditionalActionPlanTaskCommentEventType,
  ConditionalActionPlanTaskEvidenceEventType,
  ConditionalActionPlanTaskEventType,
} from '@/types/conditional-action-plan.types';

/**
 * Handles realtime notification for Conditional Action Plan related events.
 */
export class ConditionalActionPlanRealtimeNotifier {
  private readonly audienceNotifier: ScopedRealtimeAudienceNotifier;

  /**
   * Creates an instance of ConditionalActionPlanRealtimeNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(realtimeGateway: RealtimeGateway) {
    this.audienceNotifier = new ScopedRealtimeAudienceNotifier(realtimeGateway);
  }

  /**
   * Notifies subscribed clients about a Conditional Action Plan lifecycle event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyActionPlan(payload: ConditionalActionPlanPayload): void {
    const event = this.mapActionPlanEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about a Conditional Action Plan task event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyTask(payload: ConditionalActionPlanTaskPayload): void {
    const event = this.mapTaskEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about a Conditional Action Plan task comment event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyTaskComment(payload: ConditionalActionPlanTaskCommentPayload): void {
    const event = this.mapTaskCommentEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about a Conditional Action Plan task evidence event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyTaskEvidence(payload: ConditionalActionPlanTaskEvidencePayload): void {
    const event = this.mapTaskEvidenceEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Maps Conditional Action Plan lifecycle event types to websocket event names.
   */
  private mapActionPlanEvent(type: ConditionalActionPlanEventType): RealtimeEventEnum {
    const map: Record<ConditionalActionPlanEventType, RealtimeEventEnum> = {
      [ConditionalActionPlanEventType.STARTED]: RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_STARTED,
      [ConditionalActionPlanEventType.UPDATED]: RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_UPDATED,
      [ConditionalActionPlanEventType.STATUS_CHANGED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_STATUS_CHANGED,
      [ConditionalActionPlanEventType.COMPLETED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_COMPLETED,
    };

    return map[type];
  }

  /**
   * Maps Conditional Action Plan task event types to websocket event names.
   */
  private mapTaskEvent(type: ConditionalActionPlanTaskEventType): RealtimeEventEnum {
    const map: Record<ConditionalActionPlanTaskEventType, RealtimeEventEnum> = {
      [ConditionalActionPlanTaskEventType.CREATED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_CREATED,
      [ConditionalActionPlanTaskEventType.UPDATED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_UPDATED,
      [ConditionalActionPlanTaskEventType.STATUS_CHANGED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_STATUS_CHANGED,
    };

    return map[type];
  }

  /**
   * Maps Conditional Action Plan task comment event types to websocket event names.
   */
  private mapTaskCommentEvent(type: ConditionalActionPlanTaskCommentEventType): RealtimeEventEnum {
    const map: Record<ConditionalActionPlanTaskCommentEventType, RealtimeEventEnum> = {
      [ConditionalActionPlanTaskCommentEventType.CREATED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_COMMENT_CREATED,
      [ConditionalActionPlanTaskCommentEventType.UPDATED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_COMMENT_UPDATED,
      [ConditionalActionPlanTaskCommentEventType.DELETED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_COMMENT_DELETED,
    };

    return map[type];
  }

  /**
   * Maps Conditional Action Plan task evidence event types to websocket event names.
   */
  private mapTaskEvidenceEvent(
    type: ConditionalActionPlanTaskEvidenceEventType
  ): RealtimeEventEnum {
    const map: Record<ConditionalActionPlanTaskEvidenceEventType, RealtimeEventEnum> = {
      [ConditionalActionPlanTaskEvidenceEventType.CREATED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_EVIDENCE_CREATED,
      [ConditionalActionPlanTaskEvidenceEventType.UPDATED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_EVIDENCE_UPDATED,
      [ConditionalActionPlanTaskEvidenceEventType.DELETED]:
        RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_TASK_EVIDENCE_DELETED,
    };

    return map[type];
  }
}
