/**
 * Payload contract for realtime events scoped to a single corporate/customer context.
 */
export interface ScopedRealtimeAudiencePayload {
  actorId: number;
  customerId: number | null;
  corporateId: number | null;
  systemUserIds: number[];
  includeActor?: boolean;
}

/**
 * Payload contract for realtime events scoped to multiple corporates or a fallback customer.
 */
export interface MultiCorporateRealtimeAudiencePayload {
  actorId: number;
  customerId: number | null;
  corporateIds: number[];
  systemUserIds: number[];
  includeActor?: boolean;
}
