import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

interface IconButtonProps {
    text: string;
    icon: React.ComponentType<React.ComponentProps<"svg">>;
}
export function IconButton({ text, icon: Icon }: IconButtonProps) {
    return (
        <Button variant="outline" className={cn("justify-start")}>
            <Icon className="mr-2 h-4 w-4" />
            {text}
        </Button>
    );
}
