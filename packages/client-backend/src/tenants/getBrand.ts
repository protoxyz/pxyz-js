import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsGetBrandResponse = {
    background: string  
    foreground: string  
    muted: string  
    mutedForeground: string  
    popover: string  
    popoverForeground: string  
    card: string  
    cardForeground: string  
    border: string  
    input: string  
    primary: string  
    primaryForeground: string  
    secondary: string  
    secondaryForeground: string  
    accent: string  
    accentForeground: string  
    destructive: string  
    destructiveForeground: string  
    ring: string  
    radius: string  
    darkBackground: string  
    darkForeground: string  
    darkMuted: string  
    darkMutedForeground: string  
    darkPopover: string  
    darkPopoverForeground: string  
    darkCard: string  
    darkCardForeground: string  
    darkBorder: string  
    darkInput: string  
    darkPrimary: string  
    darkPrimaryForeground: string  
    darkSecondary: string  
    darkSecondaryForeground: string  
    darkAccent: string  
    darkAccentForeground: string  
    darkDestructive: string  
    darkDestructiveForeground: string  
    darkRing: string  
    darkRadius: string  
}

export type TenantsGetBrandInput = undefined;

export function getBrand(
    auth: AuthOptions,
    body?: TenantsGetBrandInput,
    options?: RequestOptions<TenantsGetBrandInput>,
    development?: boolean,
): Promise<TenantsGetBrandResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsGetBrandInput, TenantsGetBrandResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}/brand',
        {...options, body},
    );
}
