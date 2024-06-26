import { SessionUser } from '@protoxyz/types';
import { NextRequest, NextResponse } from 'next/server';
import { getSignInUrl, getSignUpUrl } from './paths';
import { getMiddlewareAuth } from './getMiddlewareAuth';
import { defaultPublicRoutes } from './util';

interface AuthMiddlewareProps {
  publicKey?: string;
  secretKey?: string | (() => Promise<string>);
  beforeAuth?: (req: NextRequest) => Promise<void>;
  afterAuth?: (
    auth: SessionUser | null,
    req: NextRequest,
    isPublic: boolean,
  ) => Promise<NextResponse>;
  publicRoutes?: string[] | undefined;
}
export function authMiddleware({
  secretKey,
  beforeAuth,
  afterAuth,
  publicRoutes = defaultPublicRoutes,
}: AuthMiddlewareProps) {
  return async (req: NextRequest) => {
    if (beforeAuth) {
      await beforeAuth(req);
    }

    const isPublic = isPublicRoute(req, { publicRoutes });

    const key = await (typeof secretKey === 'function'
      ? secretKey()
      : secretKey); 

    if (isPublic) {
      if (afterAuth) {
        const auth = await getMiddlewareAuth({ req, secretKey: key });
        const result = await afterAuth(auth, req, true);
        if (result) return result;
      }
      return NextResponse.next();
    }

    const session = await getMiddlewareAuth({ req, secretKey: key });

    if (!session && !currentPathIsSignInOrSignUp(req)) {
      return redirectToSignIn({ req, returnTo: req.url });
    }

    if (afterAuth) {
      const auth = await getMiddlewareAuth({ req, secretKey: key });
      const response = await afterAuth(auth, req, false);
      if (response) return response;
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

  if (!publicRoutes) return false;

  const publicRoutesRegex = routesToRegexp(publicRoutes);

  const fullUrl = new URL(url);
  const path = fullUrl.pathname;

  return publicRoutesRegex.test(path);
}

function routesToRegexp(routes: string[]) {
  // convert routes to regex and replace variables
  // with named capture groups
  // e.g. /users/:userId -> /users/(?<userId>[^/]+)
  routes = routes.map((route) => {
    const regex = route.replace(/\/:(\w+)/g, '/(?<$1>[^/]+)');
    return regex;
  });

  // join routes with pipe and add start and end anchors
  const regex = `^(${routes.join('|')})$`;
  return new RegExp(regex);

  // return new RegExp(`^(${routes.join('|')})$`);
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
