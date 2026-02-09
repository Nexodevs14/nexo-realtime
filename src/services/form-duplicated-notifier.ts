import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import { Notifier } from '@/interfaces/notifier';
import { RealtimeEventEnum } from '@/enums/realtime-events';
import { FormDuplicatedPayload } from '@/validators/form.validators';

/**
 * Handles realtime notification when a Form is duplicated.
 */
export class FormDuplicatedNotifier implements Notifier<FormDuplicatedPayload> {
  /**
   * Creates an instance of FormDuplicatedNotifier.
   * @param realtimeGateway - The RealtimeGateway instance to use for notifications.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notifies about a duplicated form event.
   */
  notify(payload: FormDuplicatedPayload): void {
    this.realtimeGateway.broadcast(RealtimeEventEnum.FORM_DUPLICATED, payload);
  }
}
