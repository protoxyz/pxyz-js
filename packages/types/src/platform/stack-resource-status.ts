export const StackResourceStatus = {
  pending: 'pending',
  creating: 'creating',
  updating: 'updating',
  deleting: 'deleting',
  ready: 'ready',
  failed: 'failed',
};
export type StackResourceStatus =
  (typeof StackResourceStatus)[keyof typeof StackResourceStatus];
