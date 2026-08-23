import { RealtimeEventEnum } from '@/enums/realtime-events';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import {
  DashboardReportExportCompletedPayload,
  DashboardReportExportFailedPayload,
} from '@/validators/dashboard.validators';

/**
 * Notifies the requesting browser tab about dashboard workbook export outcomes.
 *
 * Emits to `client-session:{clientSessionId}` — the same room used by other export
 * completions. The generic `notifications.updated` signal remains owned by Notification.
 */
export class DashboardExportNotifier implements Notifier<DashboardReportExportCompletedPayload> {
  /**
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Emit the completed export payload to the originating client session.
   */
  notify(payload: DashboardReportExportCompletedPayload): void {
    this.realtimeGateway.emitToClientSession(
      payload.clientSessionId,
      RealtimeEventEnum.DASHBOARD_CONTROL_PANEL_EXPORT_COMPLETED,
      payload
    );
  }

  /**
   * Emit the failed export payload to the originating client session.
   */
  notifyFailed(payload: DashboardReportExportFailedPayload): void {
    this.realtimeGateway.emitToClientSession(
      payload.clientSessionId,
      RealtimeEventEnum.DASHBOARD_CONTROL_PANEL_EXPORT_FAILED,
      payload
    );
  }
}
