 
import "server-only"
import { cookies } from "next/headers";
import { defaultCookies } from "./cookies/cookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getToken } from "./getToken";
import { FrontendCreateOrganizationOptions, ProtocolFrontendClient, ProtocolFrontendClientConfiguration } from "@protoxyz/api-clients";

export interface SignOutProps {
    redirectTo?: string;
}
 
export const signOut = async ({redirectTo = '/'}: SignOutProps = {}) => {
    const options = defaultCookies(process.env.NODE_ENV === 'production');

    cookies().delete(options.sessionToken.name);

    revalidatePath(redirectTo);
    redirect(redirectTo);
};

export async function createOrganization (body: FrontendCreateOrganizationOptions["body"], clientOptions?: ProtocolFrontendClientConfiguration)  {
    const accessToken = clientOptions?.accessToken ?? await getToken();

    if (!accessToken) return null;

    const client = new ProtocolFrontendClient({
        accessToken,
        baseUrl: clientOptions?.baseUrl ?? process.env.NEXT_PUBLIC_PXYZ_DOMAIN,
    });

    return await client.auth.organizations.create({ body });
};
 