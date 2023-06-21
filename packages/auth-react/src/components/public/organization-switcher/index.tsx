"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../../ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useProtocolAuth } from "../../../contexts/protocol-context";
import {
    organizationImage,
    organizationInitials,
    userDisplayName,
    userImage,
    userInitials,
} from "../../../lib/display";
import { useProtocolAuthOrganizationsList } from "../../../hooks/useOrganizationsList";
import { OrganizationWithRole } from "@protoxyz/types";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface OrganizationSwitcherProps extends PopoverTriggerProps {}

type Group = {
    label: string;
    teams: Pick<OrganizationWithRole, "name" | "slug" | "imageUri">[];
};

export function OrganizationSwitcher({ className }: OrganizationSwitcherProps) {
    const { user } = useProtocolAuth();
    // const { appearance } = useProtocolAuthAppearance({ component: "organizationSwitcher" });
    const { organizations } = useProtocolAuthOrganizationsList({});

    const groups: Group[] = [
        {
            label: "Personal Account",
            teams: [
                {
                    slug: "personal",
                    name: userDisplayName(user),
                    imageUri: userImage(user),
                },
            ],
        },
        {
            label: "Teams",
            teams: organizations.data,
        },
    ];

    const [open, setOpen] = React.useState(false);
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
    const [selectedTeamSlug, setSelectedTeamSlug] = React.useState<string>("personal");

    const selectedTeam = organizations.data.find((org) => org.slug === selectedTeamSlug);

    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn("w-[200px] justify-between", className)}
                    >
                        <Avatar className="mr-2 h-8 w-8">
                            <AvatarImage
                                src={selectedTeam ? organizationImage(selectedTeam) : userImage(user)}
                                alt={selectedTeam ? selectedTeam.name : userDisplayName(user)}
                            />
                            <AvatarFallback>{userInitials(user)}</AvatarFallback>
                        </Avatar>
                        {selectedTeam ? selectedTeam.name : userDisplayName(user)}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search team..." />
                            <CommandEmpty>No team found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup key={group.label} heading={group.label}>
                                    {group.teams.map((team) => (
                                        <CommandItem
                                            key={team.name}
                                            onSelect={() => {
                                                setSelectedTeamSlug(team.slug);
                                                setOpen(false);
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-8 w-8">
                                                <AvatarImage src={team.imageUri} alt={team.name} />
                                                <AvatarFallback>{organizationInitials(team)}</AvatarFallback>
                                            </Avatar>
                                            {team.name}
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedTeamSlug && selectedTeamSlug === team.slug
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false);
                                            setShowNewTeamDialog(true);
                                        }}
                                    >
                                        <PlusCircle className="mr-2 h-5 w-5" />
                                        Create Team
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create team</DialogTitle>
                    <DialogDescription>Add a new team to manage products and customers.</DialogDescription>
                </DialogHeader>
                <div>
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
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
