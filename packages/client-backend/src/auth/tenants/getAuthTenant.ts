import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthTenantsGetAuthTenantResponse = null | {
    id: string  
    name: string  
    slug: string  
    publicKey: string  
    logoId: string | null 
    logoUri: string | null 
    iconId: string | null 
    iconUri: string | null 
    environment: string  
    creatorId: string | null 
    auth: {
    id: string  
    tenantId: string  
    signUpEnabled: boolean  
    signInEnabled: boolean  
    strategyUsernamePasswordEnabled: boolean  
    strategyEmailPasswordEnabled: boolean  
    strategyEmailLinkEnabled: boolean  
    strategyEmailCodeEnabled: boolean  
    strategyPhoneCodeEnabled: boolean  
    strategyPhonePasswordEnabled: boolean  
    strategyOAuthEnabled: boolean  
    strategyAuthenticatorCodeEnabled: boolean  
    strategySecurityKeyEnabled: boolean  
    passwordsEnabled: boolean  
    emailSignInEnabled: boolean  
    phoneSignInEnabled: boolean  
    usernameSignInEnabled: boolean  
    nameRequired: boolean  
    emailRequired: boolean  
    phoneRequired: boolean  
    usernameRequired: boolean  
    passwordRequired: boolean  
    emailVerificationRequired: boolean  
    phoneVerificationRequired: boolean  
    emailVerificationCodeEnabled: boolean  
    emailVerificationLinkEnabled: boolean  
    phoneVerificationCodeEnabled: boolean  
    sessionMaximumLifetimeEnabled: boolean  
    sessionMaximumLifetime: number  
    sessionInactivityTimeoutEnabled: boolean  
    sessionInactivityTimeout: number  
    homeUri: string | null 
    frontendApiUri: string | null 
    signUpUri: string | null 
    signInRedirectUri: string | null 
    signInUri: string | null 
    signUpRedirectUri: string | null 
    logoutRedirectUri: string | null 
    userSettingsUri: string | null 
    organizationSettingsUri: string | null 
    createOrganizationUri: string | null 
    createOrganizationRedirectUri: string | null 
    emailChannelId: string | null 
    smsChannelId: string | null 
    codeVerificationEmailTemplateId: string | null 
    codeVerificationSMSMessageTemplateId: string | null 
    magicLinkEmailTemplateId: string | null 
    magicLinkSMSMessageTemplateId: string | null 
    welcomeEmailTemplateId: string | null 
    welcomeSMSMessageTemplateId: string | null 
    createdAt: string  
    updatedAt: string  
} | null 
    brand: Record<any, any>  
    domains: {
    primary: boolean  
    name: string  
}[]  
    createdAt: string  
    updatedAt: string  
}
export type AuthTenantsGetAuthTenantInput = undefined;
export function getAuthTenant(
    auth: AuthOptions,
    body?: AuthTenantsGetAuthTenantInput,
    options?: RequestOptions<AuthTenantsGetAuthTenantInput>,
    development?: boolean,
): Promise<AuthTenantsGetAuthTenantResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthTenantsGetAuthTenantInput, AuthTenantsGetAuthTenantResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/tenants/${pathParams.id}',
      options,
  );
}

