import { AuthComponentType } from "@protoxyz/themes";
import { useProtocolAuthInstance } from "../../contexts/protocol-context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface EmailInputProps {
    setFirstFactorMethod: (method: "email" | "phone") => void;
    component: AuthComponentType;
}

export function EmailInput({ setFirstFactorMethod, component }: EmailInputProps) {
    const { instance } = useProtocolAuthInstance();

    return (
        <div className="pxyz-auth-email-input-wrapper grid gap-2">
            <div className="pxyz-auth-email-input-label-wrapper flex items-center justify-between">
                <Label htmlFor="email">Email Address</Label>
                {component === "signIn" && instance?.allowedFirstFactorStrategies?.includes("phone_code") && (
                    <Button variant="link" onClick={() => setFirstFactorMethod("phone")}>
                        Use phone number
                    </Button>
                )}
            </div>
            <Input id="email" type="email" placeholder="you@example.com" className="pxyz-auth-email-input" />
        </div>
    );
}
