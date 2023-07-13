export const Environment = {
  development: 'development',
  staging: 'staging',
  production: 'production',
};
export type Environment = (typeof Environment)[keyof typeof Environment];
