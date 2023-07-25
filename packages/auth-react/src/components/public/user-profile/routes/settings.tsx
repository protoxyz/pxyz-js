import { AuthComponentType } from '@protoxyz/themes';

import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../../contexts/protocol-context';
import { useProtocolAuthProfile } from '../../../../hooks/useProfile';
import { SectionHeader } from '../section-header';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResponseStatus } from '@protoxyz/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../custom-ui/form';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Spinner } from '../../../ui/spinner';
import { GetUserProfile200Response } from '@protoxyz/core';
import { Divider } from '../../../custom-ui/divider';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import {
  userDisplayName,
  userImage,
  userInitials,
} from '../../../../lib/display';
import { useProtocolAuthEmailsList } from '../../../../hooks/useEmailsList';
import { Badge } from '../../../ui/badge';
import { PlusIcon } from 'lucide-react';

interface UserSettingsOptions {}
export function UserSettingsRoute({}: UserSettingsOptions) {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });

  return (
    <div className="grid gap-8">
      <SectionHeader title="Profile" description="" />
      <UpdateUserForm />
    </div>
  );
}

const UpdateUserFormSchema = z.object({
  firstName: z.string().min(3).max(100).optional().nullable(),
  lastName: z.string().min(3).max(100).optional().nullable(),
  username: z.string().min(3).max(100).optional().nullable(),
  locale: z.string().min(3).max(100).optional().nullable(),
  timezone: z.string().min(3).max(100).optional().nullable(),
});

interface UpdateUserFormOptions {
  onCancel?: () => void;
  onSubmit?: (response: GetUserProfile200Response) => void;
  afterUpdateUserRedirectUri?: string;
}
export function UpdateUserForm({
  onCancel,
  onSubmit,
  afterUpdateUserRedirectUri,
}: UpdateUserFormOptions) {
  const { user, tenant, navigate } = useProtocolAuth();
  const { updateProfile, isUpdating, updateError } = useProtocolAuthProfile({});

  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      locale: user.locale,
      timezone: user.timezone,
    },
  });

  async function handleFormSubmit(
    values: z.infer<typeof UpdateUserFormSchema>,
  ) {
    const response = await updateProfile({ ...values });
    if (response.status === ResponseStatus.Success) {
      if (afterUpdateUserRedirectUri) navigate(afterUpdateUserRedirectUri);
      onSubmit?.(response);
    }
  }

  function onInvalid(errors: any) {
    console.log(errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit, onInvalid)}
        className="space-y-8"
      >
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Avatar</FormLabel>
          </div>
          <Avatar className="h-24 w-24 cursor-pointer">
            <AvatarImage src={userImage(user)} alt={userDisplayName(user)} />
            <AvatarFallback>{userInitials(user)}</AvatarFallback>
          </Avatar>
        </FormItem>

        {tenant.auth?.nameRequired && (
          <>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>First Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input name="firstName" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Last Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input name="lastName" placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {tenant.auth?.usernameSignInEnabled && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Username</FormLabel>
                </div>
                <FormControl>
                  <Input name="username" placeholder="myusername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {updateError && <FormMessage>{updateError}</FormMessage>}

        <div className="flex flex-col gap-1">
          <Button
            type="submit"
            variant="default"
            className="w-full uppercase"
            disabled={isUpdating}
          >
            {isUpdating && <Spinner color="white" />}
            {!isUpdating && 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
