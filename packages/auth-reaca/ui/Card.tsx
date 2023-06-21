import clsx from "clsx";
import { useProtocolAuth } from "@/providers/protocol";

interface CardProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function LandingCard(props: CardProps) {
    const { theme } = useProtocolAuth();
    return (
        <Card
            {...props}
            className={clsx(
                theme?.landingCardBgColor ?? theme?.cardBgColor,
                theme?.landingCardBorder ?? theme?.cardBorder,
                theme?.landingCardBorderColor ?? theme?.cardBorderColor,
                theme?.landingCardBorderRadius ?? theme?.cardBorderRadius,
                theme?.landingCardBoxShadow ?? theme?.cardBoxShadow,
                theme?.landingCardPaddingHorizontal ?? theme?.cardPaddingHorizontal,
                theme?.landingCardPaddingVertical ?? theme?.cardPaddingVertical,
            )}
        />
    );
}

export function SignInCard(props: CardProps) {
    const { theme } = useProtocolAuth();

    return (
        <Card
            {...props}
            className={clsx(
                theme?.signInCardBgColor ?? theme?.cardBgColor,
                theme?.signInCardBorder ?? theme?.cardBorder,
                theme?.signInCardBorderColor ?? theme?.cardBorderColor,
                theme?.signInCardBorderRadius ?? theme?.cardBorderRadius,
                theme?.signInCardBoxShadow ?? theme?.cardBoxShadow,
                theme?.signInCardPaddingHorizontal ?? theme?.cardPaddingHorizontal,
                theme?.signInCardPaddingVertical ?? theme?.cardPaddingVertical,
            )}
        />
    );
}

export function SignUpCard(props: CardProps) {
    const { theme } = useProtocolAuth();

    return (
        <Card
            {...props}
            className={clsx(
                theme?.signUpCardBgColor ?? theme?.cardBgColor,
                theme?.signUpCardBorder ?? theme?.cardBorder,
                theme?.signUpCardBorderColor ?? theme?.cardBorderColor,
                theme?.signUpCardBorderRadius ?? theme?.cardBorderRadius,
                theme?.signUpCardBoxShadow ?? theme?.cardBoxShadow,
                theme?.signUpCardPaddingHorizontal ?? theme?.cardPaddingHorizontal,
                theme?.signUpCardPaddingVertical ?? theme?.cardPaddingVertical,
            )}
        />
    );
}

export function Card({ children, className, style }: CardProps) {
    return (
        <div className={clsx("mx-auto w-full max-w-lg", className)} style={style}>
            {children}
        </div>
    );
}
