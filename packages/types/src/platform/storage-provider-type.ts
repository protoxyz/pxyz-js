export const StorageProviderType = {
  protocol: 'protocol',
  custom_aws: 'custom_aws',
};
export type StorageProviderType =
  (typeof StorageProviderType)[keyof typeof StorageProviderType];
