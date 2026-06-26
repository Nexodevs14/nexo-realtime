import { RealtimeEventEnum } from '@/enums/realtime-events';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { ConditionalActionPlanExportCompletedPayload } from '@/validators/conditional-action-plan.validators';

/**
 * Handles notification logic when a Conditional Action Plan generated file is ready for download.
 */
export class ConditionalActionPlanExportNotifier implements Notifier<ConditionalActionPlanExportCompletedPayload> {
  /**
   * Creates an instance of ConditionalActionPlanExportNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies the requesting browser tab when a generated Conditional Action Plan file is ready.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notify(payload: ConditionalActionPlanExportCompletedPayload): void {
    this.realtimeGateway.emitToClientSession(
      payload.clientSessionId,
      RealtimeEventEnum.CONDITIONAL_ACTION_PLAN_EXPORT_COMPLETED,
      payload
    );
  }
}
