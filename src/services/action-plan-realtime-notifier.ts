import { RealtimeEventEnum } from '@/enums/realtime-events';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { ScopedRealtimeAudienceNotifier } from '@/services/scoped-realtime-audience-notifier';
import {
  ComplianceActionPlanPayload,
  ComplianceActionPlanTaskCommentPayload,
  ComplianceActionPlanTaskPayload,
} from '@/validators/action-plan.validators';
import {
  ComplianceActionPlanEventType,
  ComplianceActionPlanTaskCommentEventType,
  ComplianceActionPlanTaskEventType,
} from '@/types/action-plan.types';

/**
 * Handles realtime notification for Action Plan related events.
 */
export class ComplianceActionPlanRealtimeNotifier {
  private readonly audienceNotifier: ScopedRealtimeAudienceNotifier;

  /**
   * Creates an instance of ComplianceActionPlanRealtimeNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(realtimeGateway: RealtimeGateway) {
    this.audienceNotifier = new ScopedRealtimeAudienceNotifier(realtimeGateway);
  }

  /**
   * Notifies subscribed clients about an Action Plan lifecycle event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyActionPlan(payload: ComplianceActionPlanPayload): void {
    const event = this.mapActionPlanEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about an Action Plan task event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyTask(payload: ComplianceActionPlanTaskPayload): void {
    const event = this.mapTaskEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about an Action Plan task comment event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyTaskComment(payload: ComplianceActionPlanTaskCommentPayload): void {
    const event = this.mapTaskCommentEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Maps Action Plan lifecycle event types to websocket event names.
   */
  private mapActionPlanEvent(type: ComplianceActionPlanEventType): RealtimeEventEnum {
    const map: Record<ComplianceActionPlanEventType, RealtimeEventEnum> = {
      [ComplianceActionPlanEventType.STARTED]: RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_STARTED,
      [ComplianceActionPlanEventType.UPDATED]: RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_UPDATED,
      [ComplianceActionPlanEventType.STATUS_CHANGED]:
        RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_STATUS_CHANGED,
      [ComplianceActionPlanEventType.COMPLETED]: RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_COMPLETED,
    };

    return map[type];
  }

  /**
   * Maps Action Plan task event types to websocket event names.
   */
  private mapTaskEvent(type: ComplianceActionPlanTaskEventType): RealtimeEventEnum {
    const map: Record<ComplianceActionPlanTaskEventType, RealtimeEventEnum> = {
      [ComplianceActionPlanTaskEventType.CREATED]:
        RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_TASK_CREATED,
      [ComplianceActionPlanTaskEventType.UPDATED]:
        RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_TASK_UPDATED,
      [ComplianceActionPlanTaskEventType.STATUS_CHANGED]:
        RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_TASK_STATUS_CHANGED,
    };

    return map[type];
  }

  /**
   * Maps Action Plan task comment event types to websocket event names.
   */
  private mapTaskCommentEvent(type: ComplianceActionPlanTaskCommentEventType): RealtimeEventEnum {
    const map: Record<ComplianceActionPlanTaskCommentEventType, RealtimeEventEnum> = {
      [ComplianceActionPlanTaskCommentEventType.CREATED]:
        RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_TASK_COMMENT_CREATED,
      [ComplianceActionPlanTaskCommentEventType.UPDATED]:
        RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_TASK_COMMENT_UPDATED,
      [ComplianceActionPlanTaskCommentEventType.DELETED]:
        RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_TASK_COMMENT_DELETED,
    };

    return map[type];
  }
}
