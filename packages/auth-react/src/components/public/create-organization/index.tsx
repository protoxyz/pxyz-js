import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

export function CreateOrganization() {
    return (
        <Card className="lg:max-w-sm">
            <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Team name</Label>
                    <Input id="name" placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="plan">Subscription plan</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="free">
                                <span className="font-medium">Free</span> -{" "}
                                <span className="text-muted-foreground">Trial for two weeks</span>
                            </SelectItem>
                            <SelectItem value="pro">
                                <span className="font-medium">Pro</span> -{" "}
                                <span className="text-muted-foreground">$9/month per user</span>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    );
}
