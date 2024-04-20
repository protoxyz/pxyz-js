import "server-only";

import { FrontendListOrganizationsOptions, ProtocolFrontendClient, ProtocolFrontendClientConfiguration } from "@protoxyz/api-clients";
import { getToken } from "./getToken";
 
export const getOrganizations = async (options?: FrontendListOrganizationsOptions, clientOptions?: ProtocolFrontendClientConfiguration) => {
    const accessToken = clientOptions?.accessToken ?? await getToken();

    if (!accessToken) return null;

    const client = new ProtocolFrontendClient({
        accessToken,
        baseUrl: clientOptions?.baseUrl ?? process.env.NEXT_PUBLIC_PXYZ_DOMAIN,
    });

    return await client.auth.organizations.list(options);
};