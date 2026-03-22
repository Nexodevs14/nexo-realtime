/**
 * All supported real-time events in the system.
 */
export enum RealtimeEventEnum {
  LEGAL_BASIS_EXPORT_COMPLETED = 'legal_basis.export_completed',
  NOTIFICATIONS_UPDATED = 'notifications.updated',
  FORM_DUPLICATED = 'forms.duplicated',
  AUDIT_PROCESS_CREATED = 'audit_process.created',
  AUDIT_PROCESS_UPDATED = 'audit_process.updated',
  AUDIT_PROCESS_STATUS_CHANGED = 'audit_process.status_changed',
  AUDIT_PROCESS_DELETED = 'audit_process.deleted',
  AUDIT_EXECUTION_CREATED = 'audit_execution.created',
  AUDIT_EXECUTION_UPDATED = 'audit_execution.updated',
  AUDIT_EXECUTION_STATUS_CHANGED = 'audit_execution.status_changed',
  AUDIT_EXECUTION_DELETED = 'audit_execution.deleted',
  AUDIT_APPLICABILITY_STARTED = 'audit_applicability.started',
  AUDIT_APPLICABILITY_STATUS_CHANGED = 'audit_applicability.status_changed',
}
