import { RealtimeEventEnum } from '@/enums/realtime-events';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { ComplianceActionPlanExportCompletedPayload } from '@/validators/action-plan.validators';

/**
 * Handles notification logic when an Action Plan generated file is ready for download.
 *
 */
export class ComplianceActionPlanExportNotifier implements Notifier<ComplianceActionPlanExportCompletedPayload> {
  /**
   * Creates an instance of ComplianceActionPlanExportNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies the requesting browser tab when a generated Action Plan file is ready.
   *
   * @param payload - Validated realtime payload sent by the backend.
   */
  notify(payload: ComplianceActionPlanExportCompletedPayload): void {
    this.realtimeGateway.emitToClientSession(
      payload.clientSessionId,
      RealtimeEventEnum.COMPLIANCE_ACTION_PLAN_EXPORT_COMPLETED,
      payload
    );
  }
}
