import clsx from "clsx";

import { useProtocolAuth } from "@/providers/protocol";

interface HeadingProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function LandingHeading(props: HeadingProps) {
    const { theme } = useProtocolAuth();
    const { ...otherProps } = props;

    return (
        <Heading
            {...otherProps}
            className={clsx(
                theme?.landingHeadingFontSize ?? theme?.headingFontSize,
                theme?.landingHeadingFontWeight ?? theme?.headingFontWeight,
                theme?.landingHeadingColor ?? theme?.headingColor,
            )}
        />
    );
}

export function Heading({ children, className, style }: HeadingProps) {
    const { theme } = useProtocolAuth();

    return (
        <h1
            className={clsx(className, theme?.headingFontSize, theme?.headingFontWeight, theme?.headingColor)}
            style={style}
        >
            {children}
        </h1>
    );
}

interface HeadingProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function Subheading({ children, className, style }: HeadingProps) {
    const { theme } = useProtocolAuth();
    return (
        <h2
            className={clsx(className, theme?.subheadingColor, theme?.subheadingFontSize, theme?.subheadingFontWeight)}
            style={style}
        >
            {children}
        </h2>
    );
}
