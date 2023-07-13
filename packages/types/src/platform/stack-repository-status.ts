export const StackRepositoryStatus = {
  created: 'created',
  cloning: 'cloning',
  cloned: 'cloned',
  error: 'error',
};
export type StackRepositoryStatus =
  (typeof StackRepositoryStatus)[keyof typeof StackRepositoryStatus];
