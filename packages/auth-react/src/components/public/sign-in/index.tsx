import { SignInFlowRoute, useProtocolAuthSignInFlow } from "../../../contexts/flow-context";
import { useProtocolAuthAppearance } from "../../../contexts/protocol-context";
import { Variables } from "../../custom-ui/variables";
import { SignInForgotPasswordRoute } from "./routes/forgotPassword";
import { SignInResetPasswordRoute } from "./routes/resetPassword";
import { SignInResetPasswordSuccessRoute } from "./routes/resetPasswordSuccess";
import { SignInRoute } from "./routes/signIn";
import { SignInSuccessRoute } from "./routes/success";
import { SignInVerifyFirstFactorRoute } from "./routes/verifyFirstFactor";
import { SignInVerifySecondFactorRoute } from "./routes/verifySecondFactor";

export function SignIn() {
    const { appearance } = useProtocolAuthAppearance({ component: "signIn" });
    const { route } = useProtocolAuthSignInFlow();

    return (
        <>
            <Variables variables={appearance.variables} />
            {route === SignInFlowRoute.signIn && <SignInRoute />}
            {route === SignInFlowRoute["signIn:verifyFirstFactor"] && <SignInVerifyFirstFactorRoute />}
            {route === SignInFlowRoute["signIn:verifySecondFactor"] && <SignInVerifySecondFactorRoute />}
            {route === SignInFlowRoute["signIn:success"] && <SignInSuccessRoute />}

            {route === SignInFlowRoute["signIn:forgotPassword"] && <SignInForgotPasswordRoute />}
            {route === SignInFlowRoute["signIn:resetPassword"] && <SignInResetPasswordRoute />}
            {route === SignInFlowRoute["signIn:resetPasswordSuccess"] && <SignInResetPasswordSuccessRoute />}
        </>
    );
}
