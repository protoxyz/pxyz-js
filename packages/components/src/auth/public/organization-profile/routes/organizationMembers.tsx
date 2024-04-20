import { AuthComponentType } from '@protoxyz/themes';

import React from 'react';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthOrganizationMembers
} from '@protoxyz/auth';
import { SectionHeader } from '../../../custom-ui/section-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../ui/table';
import { MoreHorizontalIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger } from '../../../../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../ui/avatar';
import { initials, userImage } from '../../../../lib/display';
import { Spinner } from '../../../../ui/spinner';

export function OrganizationMembersRoute() {
  const component: AuthComponentType = 'organizationProfile';
  const { orgId } = useProtocolAuth();
  const { appearance } = useProtocolAuthAppearance({ component });
  const { members, isLoading } = useProtocolAuthOrganizationMembers({ orgId });

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Members"
        description="View and manage organization members"
      />

      <Table>
        {/* <TableCaption>A list of your organization members.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">User</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">{/*  */}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <Spinner color="black" />
              </TableCell>
            </TableRow>
          )}
          {members?.data?.map((member: any) => {
            return (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage
                        src={userImage(member?.user)}
                        alt={member?.user?.name ?? "User's avatar"}
                      />
                      <AvatarFallback>
                        {initials(member?.user?.name?.split(' '))}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-1  ">
                      <p className="text-lg font-medium leading-none">
                        {member?.user?.name}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {member?.user?.identifier}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-muted-foreground text-sm leading-none">
                    {new Date(member?.createdAt).toLocaleString()}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-muted-foreground text-sm leading-none">
                    {member?.role?.name}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontalIcon className="h-5 w-5" />
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
