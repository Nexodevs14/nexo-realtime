import { RealtimeEventEnum } from '@/enums/realtime-events';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { DashboardReportExportCompletedPayload } from '@/validators/dashboard.validators';

/**
 * Notifies the requesting browser tab when the control panel workbook is ready to download.
 *
 * Emits to `client-session:{clientSessionId}` — the same room used by ConditionalActionPlan,
 * ActionPlan and ComplianceExecution export completions. The generic `notifications.updated`
 * signal (user room) is intentionally left to the Notification module.
 */
export class DashboardExportNotifier implements Notifier<DashboardReportExportCompletedPayload> {
  /**
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Emit the completed export payload to the originating client session.
   *
   * @param payload - Validated realtime payload sent by the Laravel backend.
   */
  notify(payload: DashboardReportExportCompletedPayload): void {
    this.realtimeGateway.emitToClientSession(
      payload.clientSessionId,
      RealtimeEventEnum.DASHBOARD_CONTROL_PANEL_EXPORT_COMPLETED,
      payload
    );
  }
}
