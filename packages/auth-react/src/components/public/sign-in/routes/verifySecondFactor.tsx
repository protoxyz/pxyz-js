import { AuthComponentType } from "@protoxyz/themes";
import { CardWrapper } from "../../../custom-ui/card-wrapper";
import { Card } from "../../../ui/card";
import { useProtocolAuthAppearance } from "../../../../contexts/protocol-context";

export function SignInVerifySecondFactorRoute() {
    const component: AuthComponentType = "signIn";
    const { appearance } = useProtocolAuthAppearance({ component });

    return (
        <CardWrapper className={appearance?.elements?.cardWrapper}>
            <Card className={appearance?.elements?.card}>SignInVerifySecondFactorRoute</Card>
        </CardWrapper>
    );
}
