import { AuthComponentType } from '@protoxyz/themes';
import React from 'react';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthProfile,
} from '@protoxyz/auth-react';
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
} from '../../../../ui/form';
import { Input } from '../../../../ui/input';
import { Button } from '../../../../ui/button';
import { Spinner } from '../../../../ui/spinner';
import { FrontendGetUserProfile200Response } from '@protoxyz/api-clients';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../ui/avatar';
import {
  userDisplayName,
  userImage,
  userInitials,
} from '../../../../lib/display';
import { SectionHeader } from '../../../custom-ui/section-header';

export function UserSettingsRoute() {
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
  name: z.string().min(3).max(100).optional(),
  username: z.string().min(3).max(100).optional(),
  locale: z.string().min(3).max(100).optional(),
  timezone: z.string().min(3).max(100).optional(),
});

interface UpdateUserFormOptions {
  onCancel?: () => void;
  onSubmit?: (response: FrontendGetUserProfile200Response) => void;
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
      name: user?.name ?? '',
      username: user?.username ?? '',
      locale: user?.locale ?? '',
      timezone: user?.timezone ?? '',
    },
  });

  async function handleFormSubmit(
    values: z.infer<typeof UpdateUserFormSchema>,
  ) {
    const response = await updateProfile({ ...values });
    if (response.status === ResponseStatus.Success) {
      if (afterUpdateUserRedirectUri) navigate?.(afterUpdateUserRedirectUri);
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

        {tenant?.auth?.nameRequired && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>First Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {tenant?.auth?.usernameSignInEnabled && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Username</FormLabel>
                </div>
                <FormControl>
                  <Input placeholder="myusername" {...field} />
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
