import { AuthComponentType } from '@protoxyz/themes';
import React from 'react';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthPhonesList,
} from '@protoxyz/auth-react';
import { Button, LoadingButton } from '../../../../ui/button';
import { Badge } from '../../../../ui/badge';
import { CheckIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { SectionHeader } from '../../../custom-ui/section-header';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../ui/input';
import { ResponseStatus } from '@protoxyz/types';

export function UserPhonesRoute() {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { user } = useProtocolAuth();
  const {
    phones,
    deletePhone,
    deletingId,
    setPrimary,
    settingPrimaryId,
    preparingVerificationId,
    sendCode,
  } = useProtocolAuthPhonesList({});
  const [showAddPhoneForm, setShowAddPhoneForm] = React.useState(false);

  return (
    <div className="grid gap-2">
      <SectionHeader
        title="Phone Numbers"
        description="Manage the phone numbers associated with your account."
      />
      {phones?.data?.map((phone) => {
        const isPrimary = user?.primaryPhoneId === phone.id;
        const isVerified = phone.verifiedAt !== null;

        return (
          <div
            key={phone.id}
            className="border-muted flex flex-col gap-2 border-b py-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start gap-2">
                <div className="text-foreground text-md font-semibold">
                  {phone.phone}
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
                        id: phone.id,
                      })
                    }
                    loading={preparingVerificationId === phone.id}
                    disabled={preparingVerificationId === phone.id}
                  >
                    Resend Code
                  </LoadingButton>
                )}

                {!isPrimary && isVerified && (
                  <LoadingButton
                    size="sm"
                    variant="secondary"
                    loading={settingPrimaryId === phone.id}
                    disabled={settingPrimaryId === phone.id}
                    onClick={() => setPrimary({ id: phone.id })}
                  >
                    Make Primary
                  </LoadingButton>
                )}

                {!isPrimary && (
                  <LoadingButton
                    loading={deletingId === phone.id}
                    disabled={deletingId === phone.id}
                    size="sm"
                    variant="destructive"
                    onClick={() => deletePhone({ id: phone.id })}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </LoadingButton>
                )}
              </div>
            </div>

            {!isVerified && (
              <VerifyPhoneForm
                id={phone.id}
                onVerify={() => {
                  console.log('verify');
                }}
              />
            )}
          </div>
        );
      })}

      {!showAddPhoneForm && (
        <Button variant="outline" onClick={() => setShowAddPhoneForm(true)}>
          <PlusIcon className="h-5 w-5" />
          <span>Add Phone Number</span>
        </Button>
      )}

      {showAddPhoneForm && (
        <AddPhoneForm onCreate={() => setShowAddPhoneForm(false)} />
      )}
    </div>
  );
}

const addPhoneSchema = z.object({
  phoneNumber: z.string(),
});

const AddPhoneForm = ({ onCreate }: { onCreate: () => void }) => {
  const { createPhone, createError, isCreating } = useProtocolAuthPhonesList(
    {},
  );

  const form = useForm<z.infer<typeof addPhoneSchema>>({
    resolver: zodResolver(addPhoneSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof addPhoneSchema>) {
    const created = await createPhone({ phone: values.phoneNumber });
    if (created.status === ResponseStatus.Success) {
      onCreate();
    } else {
      form.setError('phoneNumber', {
        message: created.error,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-8">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>

              <FormControl>
                <Input type="tel" placeholder="555-555-5555" {...field} />
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

const verifyPhoneSchema = z.object({
  code: z.string(),
});

const VerifyPhoneForm = ({
  id,
  onVerify,
}: {
  id: string;
  onVerify: () => void;
}) => {
  const { verify, attemptingVerificationError, isAttemptingVerification } =
    useProtocolAuthPhonesList({});

  const form = useForm<z.infer<typeof verifyPhoneSchema>>({
    resolver: zodResolver(verifyPhoneSchema),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(values: z.infer<typeof verifyPhoneSchema>) {
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
                  A verification code has been sent to your phone number.
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
            Verify Phone
          </LoadingButton>
        </div>
        {attemptingVerificationError && (
          <FormMessage>{attemptingVerificationError}</FormMessage>
        )}
      </form>
    </Form>
  );
};
