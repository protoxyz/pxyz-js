import {
  SignInFlowRoute,
  useProtocolAuthSignInFlow,
} from '../../../contexts/flow-context';
import { SignInForgotPasswordRoute } from './routes/forgotPassword';
import { SignInResetPasswordRoute } from './routes/resetPassword';
import { SignInResetPasswordSuccessRoute } from './routes/resetPasswordSuccess';
import { SignInRoute } from './routes/signIn';
import { SignInSuccessRoute } from './routes/success';
import { SignInVerifyFirstFactorRoute } from './routes/verifyFirstFactor';
import { SignInVerifySecondFactorRoute } from './routes/verifySecondFactor';

interface SignInOptions {
  afterSignInRedirectUri?: string;
}
export function SignIn({ afterSignInRedirectUri }: SignInOptions) {
  const { route } = useProtocolAuthSignInFlow();

  return (
    <>
      {route === SignInFlowRoute.signIn && (
        <SignInRoute afterSignInRedirectUri={afterSignInRedirectUri} />
      )}
      {route === SignInFlowRoute['signIn:verifyFirstFactor'] && (
        <SignInVerifyFirstFactorRoute />
      )}
      {route === SignInFlowRoute['signIn:verifySecondFactor'] && (
        <SignInVerifySecondFactorRoute />
      )}
      {route === SignInFlowRoute['signIn:success'] && <SignInSuccessRoute />}

      {route === SignInFlowRoute['signIn:forgotPassword'] && (
        <SignInForgotPasswordRoute />
      )}
      {route === SignInFlowRoute['signIn:resetPassword'] && (
        <SignInResetPasswordRoute />
      )}
      {route === SignInFlowRoute['signIn:resetPasswordSuccess'] && (
        <SignInResetPasswordSuccessRoute />
      )}
    </>
  );
}
