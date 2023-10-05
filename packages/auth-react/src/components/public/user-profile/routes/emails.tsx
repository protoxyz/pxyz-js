import { AuthComponentType } from '@protoxyz/themes';

import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../../contexts/protocol-context';
import { Button, LoadingButton } from '../../../ui/button';
import { useProtocolAuthEmailsList } from '../../../../hooks/useEmailsList';
import { Badge } from '../../../ui/badge';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { SectionHeader } from '../../../custom-ui/section-header';
import React from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../custom-ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../ui/input';

interface UserEmailsRouteOptions {}
export function UserEmailsRoute({}: UserEmailsRouteOptions) {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { user } = useProtocolAuth();
  const {
    emails,
    deleteEmail,
    deletingId,
    setPrimary,
    settingPrimaryId,
    prepareVerification,
    preparingVerificationId,
    attemptVerification,
    attemptingVerificationId,
  } = useProtocolAuthEmailsList({});
  const [showAddEmailForm, setShowAddEmailForm] = React.useState(false);

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Email Addresses"
        description="Manage the email addresses associated with your account."
      />
      {emails?.data?.map((email) => {
        const isPrimary = user.primaryEmailId === email.id;
        const isVerified = email.verifiedAt !== null;

        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-foreground text-sm font-medium">
                {email.email}
              </div>
              {isVerified && (
                <Badge variant="success">
                  <CheckIcon className="h-4 w-4" /> verified
                </Badge>
              )}
              {!isVerified && <Badge variant="secondary">unverified</Badge>}
              {isPrimary && <Badge variant="secondary">primary</Badge>}
            </div>
            <div className="flex items-center gap-1">
              {!isVerified && (
                <LoadingButton
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    prepareVerification({
                      id: email.id,
                    })
                  }
                  loading={preparingVerificationId === email.id}
                  disabled={preparingVerificationId === email.id}
                >
                  Send Verification Code
                </LoadingButton>
              )}

              {!isPrimary && isVerified && (
                <LoadingButton
                  size="sm"
                  variant="secondary"
                  loading={settingPrimaryId === email.id}
                  disabled={settingPrimaryId === email.id}
                  onClick={() => setPrimary({ id: email.id })}
                >
                  Make Primary
                </LoadingButton>
              )}

              {!isPrimary && (
                <LoadingButton
                  loading={deletingId === email.id}
                  disabled={deletingId === email.id}
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteEmail({ id: email.id })}
                >
                  Delete
                </LoadingButton>
              )}
            </div>
          </div>
        );
      })}

      {!showAddEmailForm && (
        <Button variant="outline" onClick={() => setShowAddEmailForm(true)}>
          <PlusIcon className="h-5 w-5" />
          <span>Add Email Address</span>
        </Button>
      )}

      {showAddEmailForm && (
        <AddEmailForm onCreate={() => setShowAddEmailForm(false)} />
      )}
    </div>
  );
}

const addEmailSchema = z.object({
  emailAddress: z.string().email(),
});

const AddEmailForm = ({ onCreate }: { onCreate: () => void }) => {
  const { protocol } = useProtocolAuth();
  const { createEmail, createError, isCreating } = useProtocolAuthEmailsList(
    {},
  );

  const form = useForm<z.infer<typeof addEmailSchema>>({
    resolver: zodResolver(addEmailSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof addEmailSchema>) {
    const created = await createEmail({ email: values.emailAddress });

    onCreate();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>

              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {createError && <FormMessage>{createError}</FormMessage>}

        <LoadingButton
          type="submit"
          variant="default"
          className="w-full uppercase"
          disabled={isCreating}
          loading={isCreating}
        >
          <PlusIcon className="h-4 w-4" />
          Add
        </LoadingButton>
      </form>
    </Form>
  );
};
