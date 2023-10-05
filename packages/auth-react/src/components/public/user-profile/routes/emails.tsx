import { AuthComponentType } from '@protoxyz/themes';

import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../../contexts/protocol-context';
import { Button, LoadingButton } from '../../../ui/button';
import { useProtocolAuthEmailsList } from '../../../../hooks/useEmailsList';
import { Badge } from '../../../ui/badge';
import { CheckIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { SectionHeader } from '../../../custom-ui/section-header';
import React from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../custom-ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../ui/input';
import { ResponseStatus } from '@protoxyz/types';

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
    preparingVerificationId,
    sendCode,
  } = useProtocolAuthEmailsList({});
  const [showAddEmailForm, setShowAddEmailForm] = React.useState(false);

  return (
    <div className="grid gap-2">
      <SectionHeader
        title="Email Addresses"
        description="Manage the email addresses associated with your account."
      />
      <div>
        {emails?.data?.map((email) => {
          const isPrimary = user.primaryEmailId === email.id;
          const isVerified = email.verifiedAt !== null;

          return (
            <div
              key={email.id}
              className="border-muted flex flex-col gap-2 border-b py-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start gap-2">
                  <div className="text-foreground text-md font-semibold">
                    {email.email}
                  </div>
                  <div className="flex items-center gap-2">
                    {isVerified && (
                      <Badge variant="success">
                        <CheckIcon className="h-4 w-4" /> verified
                      </Badge>
                    )}
                    {isPrimary && <Badge variant="secondary">primary</Badge>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!isVerified && (
                    <LoadingButton
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        sendCode({
                          id: email.id,
                        })
                      }
                      loading={preparingVerificationId === email.id}
                      disabled={preparingVerificationId === email.id}
                    >
                      Resend Code
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
                      <TrashIcon className="h-4 w-4" />
                    </LoadingButton>
                  )}
                </div>
              </div>

              {!isVerified && (
                <VerifyEmailForm id={email.id} onVerify={() => {}} />
              )}
            </div>
          );
        })}
      </div>

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-8">
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
          className="w-full  "
          disabled={isCreating}
          loading={isCreating}
        >
          <PlusIcon className="h-4 w-4" />
          Add
        </LoadingButton>

        <Button variant="ghost" className="w-full" onClick={() => onCreate()}>
          Cancel
        </Button>
      </form>
    </Form>
  );
};

const verifyEmailSchema = z.object({
  code: z.string(),
});

const VerifyEmailForm = ({
  id,
  onVerify,
}: {
  id: string;
  onVerify: () => void;
}) => {
  const { verify, attemptingVerificationError, isAttemptingVerification } =
    useProtocolAuthEmailsList({});

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(values: z.infer<typeof verifyEmailSchema>) {
    const verified = await verify({
      id,
      code: values.code,
    });

    if (verified.status === ResponseStatus.Success) {
      onVerify();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted-foreground/5 mt-4 flex w-full flex-col gap-2 rounded-lg p-4"
      >
        <div className="flex w-full  items-center gap-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl className="flex-1 flex-grow">
                  <Input
                    className="bg-background w-full"
                    placeholder="Enter verification code..."
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A verification code has been sent to your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            variant="default"
            className="mb-7 flex-shrink"
            size="sm"
            disabled={isAttemptingVerification}
            loading={isAttemptingVerification}
          >
            Verify Email
          </LoadingButton>
        </div>
        {attemptingVerificationError && (
          <FormMessage>{attemptingVerificationError}</FormMessage>
        )}
      </form>
    </Form>
  );
};
