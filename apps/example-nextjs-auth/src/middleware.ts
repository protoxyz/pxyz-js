import { authMiddleware } from '@protoxyz/auth';

export default authMiddleware({
  publicRoutes: ['/', '/sign-up', '/sign-in', '/users/:id'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
