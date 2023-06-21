import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function PasswordInput() {
    return (
        <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
        </div>
    );
}
