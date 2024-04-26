import { auth } from "@protoxyz/auth";
import { redirect } from "next/navigation";

interface ProtectOptions {
  role?: string;
  orgRole?: string;
}

export const protectPage = async (options?: ProtectOptions) => {
  const session = await auth();

  if (!session) {
    return redirect(getLoginUrl());
  }

  if (options?.role && session.claims?.role !== options.role) {
    return redirect("/unauthorized");
  }

  return session;
};

// Returns the URL to the hosted accounts page
export const getAccountsUrl = ({ path = "/" }: { path?: string } = {}) => {
  return new URL(path, `https://${process.env.NEXT_PUBLIC_PXYZ_DOMAIN}`);
};

// Returns the URL to the login path on the hosted accounts page
export const getLoginUrl = (redirectPath: string | undefined = "/") => {
  const url = getAccountsUrl({ path: "/sign-in" });
  const redirectUri = new URL("/api/auth/callback", getWebUrl());
  redirectUri.searchParams.set("redirectPath", redirectPath);

  url.searchParams.set("redirectUri", redirectUri.toString());

  return url.toString();
};

// Returns the URL to the sign up path on the hosted accounts page
export const getSignupUrl = (redirectPath: string | undefined = "/onboard") => {
  const url = getAccountsUrl({ path: "/sign-up" });
  const redirectUri = new URL("/api/auth/callback", getWebUrl());
  redirectUri.searchParams.set("redirectPath", redirectPath);

  url.searchParams.set("redirectUri", redirectUri.toString());

  return url.toString();
};

// Returns the URL to this page
export function getWebUrl() {
  return process.env.NODE_ENV === "production"
    ? `https://www.yourdomain.com`
    : "http://localhost:3000";
}
