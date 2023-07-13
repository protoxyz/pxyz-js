export const StackResourceAvailabilityZoneType = {
  single: 'single',
  multi: 'multi',
};
export type StackResourceAvailabilityZoneType =
  (typeof StackResourceAvailabilityZoneType)[keyof typeof StackResourceAvailabilityZoneType];
