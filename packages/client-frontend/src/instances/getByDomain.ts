import { request, RequestOptions, AuthOptions } from '../request';
import { SERVERS } from '../servers';

export type InstancesGetByDomainResponse = {
  status: string;
  error: string;
  data: {
    tenant: {
      id: string;
      name: string;
      slug: string;
      publicKey: string;
      logoId: string;
      logoUri: string;
      iconId: string;
      iconUri: string;
      environment: string;
      creatorId: string;
      auth: {
        id: string;
        tenantId: string;
        strategyUsernamePasswordEnabled: boolean;
        strategyEmailPasswordEnabled: boolean;
        strategyEmailLinkEnabled: boolean;
        strategyEmailCodeEnabled: boolean;
        strategyPhoneCodeEnabled: boolean;
        strategyPhonePasswordEnabled: boolean;
        strategyOAuthEnabled: boolean;
        strategyAuthenticatorCodeEnabled: boolean;
        strategySecurityKeyEnabled: boolean;
        passwordsEnabled: boolean;
        emailSignInEnabled: boolean;
        phoneSignInEnabled: boolean;
        usernameSignInEnabled: boolean;
        nameRequired: boolean;
        emailRequired: boolean;
        phoneRequired: boolean;
        usernameRequired: boolean;
        passwordRequired: boolean;
        emailVerificationRequired: boolean;
        phoneVerificationRequired: boolean;
        emailVerificationCodeEnabled: boolean;
        emailVerificationLinkEnabled: boolean;
        phoneVerificationCodeEnabled: boolean;
        sessionMaximumLifetimeEnabled: boolean;
        sessionMaximumLifetime: number;
        sessionInactivityTimeoutEnabled: boolean;
        sessionInactivityTimeout: number;
        homeUri: string;
        frontendApiUri: string;
        signUpUri: string;
        signInRedirectUri: string;
        signInUri: string;
        signUpRedirectUri: string;
        logoutRedirectUri: string;
        userSettingsUri: string;
        organizationSettingsUri: string;
        createOrganizationUri: string;
        createOrganizationRedirectUri: string;
        emailChannelId: string;
        smsChannelId: string;
        codeVerificationEmailTemplateId: string;
        codeVerificationSMSMessageTemplateId: string;
        magicLinkEmailTemplateId: string;
        magicLinkSMSMessageTemplateId: string;
        welcomeEmailTemplateId: string;
        welcomeSMSMessageTemplateId: string;
        createdAt: string;
        updatedAt: string;
      };
      domains: {
        primary: boolean;
        name: string;
      }[];
      createdAt: string;
      updatedAt: string;
    };
  };
};

export function getByDomain(
  auth: AuthOptions,
  options?: RequestOptions,
  development?: boolean,
): Promise<InstancesGetByDomainResponse> {
  return request<InstancesGetByDomainResponse>(
    auth,
    'GET',
    development ? SERVERS.development : SERVERS.production,
    '/tenants/domain/${pathParams.host}',
    options,
  );
}
