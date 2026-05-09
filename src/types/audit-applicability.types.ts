/**
 * Event type enum for Audit Applicability realtime.
 */
export enum AuditApplicabilityEventType {
  STARTED = 'started',
  STATUS_CHANGED = 'status_changed',
  COMPLETED = 'completed',
  COMPLIANCE_SUBJECTS_GENERATED = 'compliance_subjects_generated',
}

/**
 * Event type enum for Audit Applicability Aspect realtime events.
 */
export enum AuditApplicabilityAspectEventType {
  STATUS_CHANGED = 'status_changed',
  UPDATED = 'updated',
}
