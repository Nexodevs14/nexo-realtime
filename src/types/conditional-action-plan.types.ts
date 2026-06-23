/**
 * Event types for Conditional Action Plan lifecycle realtime events.
 */
export enum ConditionalActionPlanEventType {
  STARTED = 'started',
  UPDATED = 'updated',
  STATUS_CHANGED = 'status_changed',
  COMPLETED = 'completed',
}

/**
 * Event types for Conditional Action Plan task realtime events.
 */
export enum ConditionalActionPlanTaskEventType {
  CREATED = 'created',
  UPDATED = 'updated',
  STATUS_CHANGED = 'status_changed',
}

/**
 * Event types for Conditional Action Plan task comment realtime events.
 */
export enum ConditionalActionPlanTaskCommentEventType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}

/**
 * Event types for Conditional Action Plan task evidence realtime events.
 */
export enum ConditionalActionPlanTaskEvidenceEventType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}
