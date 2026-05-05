/**
 * Event types for Action Plan lifecycle realtime events.
 */
export enum ComplianceActionPlanEventType {
  STARTED = 'started',
  UPDATED = 'updated',
  STATUS_CHANGED = 'status_changed',
  COMPLETED = 'completed',
}

/**
 * Event types for Action Plan task realtime events.
 */
export enum ComplianceActionPlanTaskEventType {
  CREATED = 'created',
  UPDATED = 'updated',
  STATUS_CHANGED = 'status_changed',
}

/**
 * Event types for Action Plan task comment realtime events.
 */
export enum ComplianceActionPlanTaskCommentEventType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}
