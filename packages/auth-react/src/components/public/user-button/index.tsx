import { LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { useProtocolAuth } from '../../../contexts/protocol-context';
import { SignOutButton } from '../sign-out-button';
import {
  userDisplayName,
  userImage,
  userInitials,
  userSecondaryDisplayName,
} from '../../../lib/display';
import { useCallback, useMemo, useState } from 'react';
import { Dialog, DialogContent } from '../../ui/dialog';
import { UserProfile } from '../user-profile';

interface UserButtonOptions {
  mode?: 'redirect' | 'popup';
  display?: 'avatar' | 'name' | 'both';
}
export function UserButton({
  mode = 'popup',
  display = 'avatar',
}: UserButtonOptions) {
  const { user } = useProtocolAuth();
  const [showUserProfileDialog, setShowUserProfileDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const redirectToUserProfile = useCallback(() => {
    if (mode === 'popup') return;
    window.location.href = '/user';
  }, [mode]);

  // const { appearance } = useProtocolAuthAppearance({ component: "userButton" });

  const triggerContent = useMemo(() => {
    switch (display) {
      case 'avatar':
        return (
          <Avatar
            className="h-8 w-8 cursor-pointer"
            onClick={redirectToUserProfile}
          >
            <AvatarImage src={userImage(user)} alt={userDisplayName(user)} />
            <AvatarFallback>{userInitials(user)}</AvatarFallback>
          </Avatar>
        );
      case 'name':
        return (
          <Button onClick={redirectToUserProfile} size="lg" variant="ghost">
            <div className="flex flex-col items-start gap-1  ">
              <p className="text-lg font-medium leading-none">
                {userDisplayName(user)}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {userSecondaryDisplayName(user)}
              </p>
            </div>
          </Button>
        );
      case 'both':
        return (
          <Button onClick={redirectToUserProfile} size="lg" variant="ghost">
            <Avatar
              className="h-8 w-8 cursor-pointer"
              onClick={redirectToUserProfile}
            >
              <AvatarImage src={userImage(user)} alt={userDisplayName(user)} />
              <AvatarFallback>{userInitials(user)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-1  ">
              <p className="text-lg font-medium leading-none">
                {userDisplayName(user)}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {userSecondaryDisplayName(user)}
              </p>
            </div>
          </Button>
        );
    }
  }, [display, user]);

  if (mode === 'redirect') {
    return triggerContent;
  }

  return (
    <Dialog
      open={showUserProfileDialog}
      onOpenChange={setShowUserProfileDialog}
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{triggerContent}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium leading-none">
                {userDisplayName(user)}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {userSecondaryDisplayName(user)}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => {
                setOpen(false);
                setShowUserProfileDialog(true);
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
            {/* <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
            {/* <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                    </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton>
              <div className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </div>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <UserProfile />
      </DialogContent>
    </Dialog>
  );
}
