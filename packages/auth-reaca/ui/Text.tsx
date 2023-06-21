import clsx from "clsx";

interface TextProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function Text({ children, className, style }: TextProps) {
    return (
        <h2 className={clsx(className)} style={style}>
            {children}
        </h2>
    );
}
