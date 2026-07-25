import { RealtimeGateway } from '@/interfaces/realtime-gateway';
import {
  MultiCorporateRealtimeAudiencePayload,
  ScopedRealtimeAudiencePayload,
} from '@/types/scoped-realtime-audience.types';

/**
 * Emits realtime events to contextual rooms and supplemental system users.
 */
export class ScopedRealtimeAudienceNotifier {
  /**
   * Creates an instance of ScopedRealtimeAudienceNotifier.
   *
   * @param realtimeGateway - Gateway abstraction used to emit websocket events.
   */
  constructor(private readonly realtimeGateway: RealtimeGateway) {}

  /**
   * Notify a single-scope audience.
   *
   * The event is emitted to either the corporate room or the fallback customer room,
   * excluding the actor unless explicitly requested, and then to each
   * supplemental system user.
   */
  notifyScoped<T extends ScopedRealtimeAudiencePayload>(payload: T, event: string): void {
    if (payload.corporateId !== null) {
      const room = `corporate:${payload.corporateId}`;
      if (payload.includeActor) {
        this.realtimeGateway.broadcastToRoom(room, event, payload);
      } else {
        this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      }
    } else if (payload.customerId !== null) {
      const room = `customer:${payload.customerId}`;
      if (payload.includeActor) {
        this.realtimeGateway.broadcastToRoom(room, event, payload);
      } else {
        this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      }
    }

    this.notifySystemUsers(
      payload.systemUserIds,
      payload.actorId,
      event,
      payload,
      payload.includeActor ?? false
    );
  }

  /**
   * Notify a multi-corporate audience with a fallback customer room.
   */
  notifyMultiCorporate<T extends MultiCorporateRealtimeAudiencePayload>(
    payload: T,
    event: string
  ): void {
    if (payload.corporateIds.length > 0) {
      for (const corporateId of payload.corporateIds) {
        const room = `corporate:${corporateId}`;
        if (payload.includeActor) {
          this.realtimeGateway.broadcastToRoom(room, event, payload);
        } else {
          this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
        }
      }
    } else if (payload.customerId !== null) {
      const room = `customer:${payload.customerId}`;
      if (payload.includeActor) {
        this.realtimeGateway.broadcastToRoom(room, event, payload);
      } else {
        this.realtimeGateway.broadcastToRoomExceptUser(room, payload.actorId, event, payload);
      }
    }

    this.notifySystemUsers(
      payload.systemUserIds,
      payload.actorId,
      event,
      payload,
      payload.includeActor ?? false
    );
  }

  /**
   * Notify each resolved system user, optionally including the actor, while
   * removing duplicate user identifiers.
   */
  private notifySystemUsers<T>(
    systemUserIds: number[],
    actorId: number,
    event: string,
    payload: T,
    includeActor: boolean
  ): void {
    for (const userId of new Set(systemUserIds)) {
      if (userId === actorId && !includeActor) {
        continue;
      }

      this.realtimeGateway.emitToUser(userId, event, payload);
    }
  }
}
