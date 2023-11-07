import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type TenantsUpdateBrandResponse = {
    id: string  
    name: string  
    slug: string  
    publicKey: string  
    logoId: string | null 
    logoUri: string | null 
    iconId: string | null 
    iconUri: string | null 
    brand: Record<any, any>  
    environment: string  
    createdAt: string  
    updatedAt: string  
}

export type TenantsUpdateBrandInput = {
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
};

export function updateBrand(
    auth: AuthOptions,
    body?: TenantsUpdateBrandInput,
    options?: RequestOptions<TenantsUpdateBrandInput>,
    development?: boolean,
): Promise<TenantsUpdateBrandResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<TenantsUpdateBrandInput, TenantsUpdateBrandResponse>(
        auth,
        'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/tenants/${pathParams.id}/brand',
        {...options, body},
    );
}
