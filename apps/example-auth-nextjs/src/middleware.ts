import { authMiddleware } from '@protoxyz/auth-nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/sign-up', '/sign-in', '/users/:id'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
