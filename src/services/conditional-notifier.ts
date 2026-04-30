import { RealtimeEventEnum } from '@/enums/realtime-events';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import {
  ConditionalPayload,
  ConditionalRequirementPayload,
} from '@/validators/conditional.validators';
import { ConditionalEventType, ConditionalRequirementEventType } from '@/types/conditional.types';
import { ScopedRealtimeAudienceNotifier } from '@/services/scoped-realtime-audience-notifier';

/**
 * Handles realtime notification for Conditional module events.
 */
export class ConditionalNotifier {
  private readonly audienceNotifier: ScopedRealtimeAudienceNotifier;

  /**
   * Creates an instance of ConditionalNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(realtimeGateway: RealtimeGateway) {
    this.audienceNotifier = new ScopedRealtimeAudienceNotifier(realtimeGateway);
  }

  /**
   * Notifies subscribed clients about a Conditional CRUD event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyConditional(payload: ConditionalPayload): void {
    const event = this.mapConditionalEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Notifies subscribed clients about a Conditional Requirement CRUD event.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notifyConditionalRequirement(payload: ConditionalRequirementPayload): void {
    const event = this.mapConditionalRequirementEvent(payload.event);
    this.audienceNotifier.notifyScoped(payload, event);
  }

  /**
   * Maps Conditional event types to websocket event names.
   */
  private mapConditionalEvent(type: ConditionalEventType): RealtimeEventEnum {
    const map: Record<ConditionalEventType, RealtimeEventEnum> = {
      [ConditionalEventType.CREATED]: RealtimeEventEnum.CONDITIONAL_CREATED,
      [ConditionalEventType.UPDATED]: RealtimeEventEnum.CONDITIONAL_UPDATED,
      [ConditionalEventType.DELETED]: RealtimeEventEnum.CONDITIONAL_DELETED,
    };

    return map[type];
  }

  /**
   * Maps Conditional Requirement event types to websocket event names.
   */
  private mapConditionalRequirementEvent(type: ConditionalRequirementEventType): RealtimeEventEnum {
    const map: Record<ConditionalRequirementEventType, RealtimeEventEnum> = {
      [ConditionalRequirementEventType.CREATED]: RealtimeEventEnum.CONDITIONAL_REQUIREMENT_CREATED,
      [ConditionalRequirementEventType.UPDATED]: RealtimeEventEnum.CONDITIONAL_REQUIREMENT_UPDATED,
      [ConditionalRequirementEventType.DELETED]: RealtimeEventEnum.CONDITIONAL_REQUIREMENT_DELETED,
    };

    return map[type];
  }
}
