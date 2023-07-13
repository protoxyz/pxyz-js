export const StackServiceStatus = {
  pending: 'pending',
  deploying: 'deploying',
  failed: 'failed',
  ready: 'ready',
};
export type StackServiceStatus =
  (typeof StackServiceStatus)[keyof typeof StackServiceStatus];
