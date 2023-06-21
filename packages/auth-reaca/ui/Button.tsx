import Link from "next/link";

import { Spinner } from "./Spinner";

function ButtonInner({ arrow = false, children }: { arrow?: boolean; children: React.ReactNode }) {
    return (
        <>
            <span className="group-hover:opacity-15 absolute inset-0 rounded-md bg-gradient-to-b from-white/80 to-white opacity-10 transition-opacity" />
            <span className="opacity-7.5 absolute inset-0 rounded-md shadow-[inset_0_1px_1px_white] transition-opacity group-hover:opacity-10" />
            {children} {arrow ? <span aria-hidden="true">&rarr;</span> : null}
        </>
    );
}

export function Button({
    href,
    className,
    arrow,
    children,
    type,
    loading,
    onClick,
    ...props
}: {
    href?: string;
    className?: string;
    arrow?: boolean;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    onClick?: () => void;
}) {
    // className = clsx(
    //     className,
    //     "group relative isolate flex-none rounded-md py-1.5 text-[0.8125rem]/6 font-semibold text-white",
    //     arrow ? "pl-2.5 pr-[calc(9/16*1rem)]" : "px-2.5",
    // );

    const style = {
        position: "relative",
        borderRadius: "0.375rem",
        padding: "0.375rem 0.75rem",
        fontSize: "0.8125rem",
        fontWeight: 600,
        lineHeight: "1.5rem",
        color: "white",
        flex: 1,
    } as React.CSSProperties;

    return href ? (
        <Link href={href} style={style} className={className} {...props}>
            <ButtonInner arrow={arrow}>{children}</ButtonInner>
        </Link>
    ) : (
        <button style={style} onClick={onClick} className={className} type={type} {...props}>
            {loading && <Spinner />}
            {!loading && <ButtonInner arrow={arrow}>{children}</ButtonInner>}
        </button>
    );
}
