import { cn } from "../../lib/utils";

interface CardWrapperProps {
    children: React.ReactNode;
    className?: string;
}
export function CardWrapper({ children, className }: CardWrapperProps) {
    return <div className={cn("pxyz-auth-card-wrapper w-full lg:max-w-md", className)}>{children}</div>;
}
