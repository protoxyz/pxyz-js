import { AuthComponentType } from "@protoxyz/themes";
import { CardWrapper } from "../../../custom-ui/card-wrapper";
import { Card } from "../../../ui/card";
import { useProtocolAuthAppearance, useProtocolAuthInstance } from "../../../../contexts/protocol-context";
import { useBrandName } from "../../../../hooks/useBrand";

export function SignInVerifySecondFactorRoute() {
    const component: AuthComponentType = "signIn";
    const { appearance } = useProtocolAuthAppearance({ component });
    const { instance } = useProtocolAuthInstance();
    const brandName = useBrandName({ component });

    return (
        <CardWrapper className={appearance.elements.cardWrapper}>
            <Card className={appearance.elements.card}>SignInVerifySecondFactorRoute</Card>
        </CardWrapper>
    );
}
