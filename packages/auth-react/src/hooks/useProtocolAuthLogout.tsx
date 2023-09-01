import * as React from 'react';
import { useProtocolAuthClient } from '../contexts/client-context';
import {
  SignInFlowRoute,
  SignUpFlowRoute,
  useProtocolAuthFlow,
} from '../contexts/flow-context';
import { useProtocolAuth } from '../contexts/protocol-context';
import { SESSION_COOKIE_NAME, deleteSessionCookie } from '../lib/cookies';

interface UseProtocolAuthLogoutProps {
  afterSignOutUrl?: string;
}
export function useProtocolAuthLogout(
  { afterSignOutUrl }: UseProtocolAuthLogoutProps = {
    afterSignOutUrl: '/',
  },
) {
  const { setSignIn: setClientSignIn, setSignUp: setClientSignUp } =
    useProtocolAuthClient();
  const { signIn, signUp } = useProtocolAuthFlow();
  const {   reset, protocol,   navigate } = useProtocolAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const logout = async (afterSignOutUri?: string) => {
    setIsLoggingOut(true);
    try {
      reset();

      setClientSignIn(null);
      setClientSignUp(null);

      signIn.setRoute(SignInFlowRoute.signIn);
      signUp.setRoute(SignUpFlowRoute.signUp);
      protocol.auth.sessions.end();
    } catch (error) {
      console.error(error);
    }
    setIsLoggingOut(false);
    navigate(afterSignOutUri ?? afterSignOutUrl ?? '/');
  };

  return { isLoggingOut, logout };
}
