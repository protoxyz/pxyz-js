import { SessionUser } from '@protoxyz/types';
import { NextRequest, NextResponse } from 'next/server';
import { getSignInUrl, getSignUpUrl } from './paths';
import { getMiddlewareAuth } from './getMiddlewareAuth';
import { defaultPublicRoutes } from './util';

interface AuthMiddlewareProps {
  beforeAuth?: (req: NextRequest) => Promise<void>;
  afterAuth?: (
    auth: SessionUser,
    req: NextRequest,
  ) => Promise<NextResponse | void>;
  publicRoutes?: string[];
}
export function authMiddleware({
  beforeAuth,
  afterAuth,
  publicRoutes = defaultPublicRoutes,
}: AuthMiddlewareProps) {
  return async (req: NextRequest) => {
    if (beforeAuth) {
      await beforeAuth(req);
    }

    const isPublic = isPublicRoute(req, { publicRoutes });

    if (isPublic) {
      if (afterAuth) {
        const auth = await getMiddlewareAuth({ req });
        const result = await afterAuth(auth, req);
        if (result) return result;
      }
      return NextResponse.next();
    } else {
      if (afterAuth) {
        const auth = await getMiddlewareAuth({ req });
        await afterAuth(auth, req);
      }
    }

    const session = await getMiddlewareAuth({ req });

    if (!session && !currentPathIsSignInOrSignUp(req)) {
      return redirectToSignIn({ req, returnTo: req.url });
    }

    return NextResponse.next();
  };
}

function currentPathIsSignInOrSignUp(req: NextRequest) {
  const { url } = req;
  const fullUrl = new URL(url);
  const path = fullUrl.pathname;
  const signInUrl = getSignInUrl({ base: req.url });
  const signInPath = new URL(signInUrl).pathname;
  const signUpUrl = getSignUpUrl({ base: req.url });
  const signUpPath = new URL(signUpUrl).pathname;

  return path === signInPath || path === signUpPath;
}

function isPublicRoute(req: NextRequest, options: AuthMiddlewareProps) {
  const { url } = req;

  const { publicRoutes } = options;

  const publicRoutesRegex = routesToRegexp(publicRoutes);

  const fullUrl = new URL(url);
  const path = fullUrl.pathname;

  return publicRoutesRegex.test(path);
}

function routesToRegexp(routes: string[]) {
  return new RegExp(`^(${routes.join('|')})$`);
}

interface RedirectToSignInProps {
  req: NextRequest;
  returnTo?: string;
}
function redirectToSignIn({ req, returnTo = '/' }: RedirectToSignInProps) {
  const signInUrl = getSignInUrl({ base: req.url });
  const signInRedirect = new URL(`?returnTo=${returnTo}`, signInUrl);
  return NextResponse.redirect(signInRedirect);
}
