import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { CardWrapper } from "../../custom-ui/card-wrapper";
import { Variables } from "../../custom-ui/variables";
import { useProtocolAuthAppearance, useProtocolAuthInstance } from "../../../contexts/protocol-context";
import { CardFooterLinks } from "../../custom-ui/card-footer-links";
import { FooterLinks } from "../../custom-ui/footer-links";
import { BrandLogo, BrandLogoWrapper } from "../../custom-ui/brand-logo";
import { AuthComponentType } from "@protoxyz/themes";
import { SocialLinks } from "../../custom-ui/social-links";
import { Divider } from "../../custom-ui/divider";

export function SignUp() {
    const component: AuthComponentType = "signUp";
    const { appearance } = useProtocolAuthAppearance({ component });
    const { instance } = useProtocolAuthInstance();
    const usingPasswords = instance?.strategy === "passwords";

    return (
        <CardWrapper component={component}>
            <Variables variables={appearance?.variables} />
            <Card className={appearance?.elements?.card}>
                <CardHeader className={appearance?.elements?.cardHeader}>
                    <BrandLogoWrapper>
                        <BrandLogo component={component} />
                    </BrandLogoWrapper>
                    <CardTitle className={appearance?.elements?.cardHeaderTitle}>Create an account</CardTitle>
                    <CardDescription className={appearance?.elements?.cardHeaderDescription}>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className={appearance?.elements?.cardContent}>
                    <SocialLinks appearance={appearance} instance={instance} />
                    <Divider />
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Create account</Button>
                    <FooterLinks
                        appearance={appearance}
                        instance={instance}
                        usingPasswords={usingPasswords}
                        component={component}
                    />
                </CardFooter>
            </Card>
            <CardFooterLinks component={component} />
        </CardWrapper>
    );
}
