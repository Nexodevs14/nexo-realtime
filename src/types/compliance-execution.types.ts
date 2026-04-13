/**
 * Event types for Compliance Execution lifecycle realtime events.
 */
export enum ComplianceExecutionEventType {
  STARTED = 'started',
  STATUS_CHANGED = 'status_changed',
  COMPLETED = 'completed',
}

/**
 * Event types for Compliance Execution Aspect realtime events.
 */
export enum ComplianceExecutionAspectEventType {
  STATUS_CHANGED = 'status_changed',
}

/**
 * Event types for Compliance Execution Subject realtime events.
 */
export enum ComplianceExecutionSubjectEventType {
  STATUS_CHANGED = 'status_changed',
}

/**
 * Event types for Compliance Execution Subject Comment realtime events.
 */
export enum ComplianceExecutionSubjectCommentEventType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}

/**
 * Event types for Compliance Evidence realtime events.
 */
export enum ComplianceEvidenceEventType {
  CREATED = 'created',
  DELETED = 'deleted',
}
