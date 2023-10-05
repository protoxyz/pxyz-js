import { AuthComponentType } from '@protoxyz/themes';

import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../../contexts/protocol-context';
import { SectionHeader } from '../../../custom-ui/section-header';
import { z } from 'zod';
import { FrontendUpdateOrganization200Response } from '@protoxyz/core';
import { useProtocolAuthOrganizationsList } from '../../../../hooks/useOrganizationsList';
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
import { Button, LoadingButton } from '../../../ui/button';
import { Spinner } from '../../../ui/spinner';
import { Divider } from '../../../custom-ui/divider';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../ui/alert-dialog';

interface UpdateOrganizationFormOptions {
  onDelete?: () => void;
}
function DeleteOrganizationCard({ onDelete }: UpdateOrganizationFormOptions) {
  const { protocol } = useProtocolAuth();
  const { deleteOrganization } = useProtocolAuthOrganizationsList({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete This Organization</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                color="red"
                onClick={() => deleteOrganization({ onDelete })}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

interface OrganizationSettingsOptions {
  onDeleteOrganization?: () => void;
}
export function OrganizationSettingsRoute({
  onDeleteOrganization,
}: OrganizationSettingsOptions) {
  const component: AuthComponentType = 'organizationProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { org } = useProtocolAuth();

  const isOwner = org?.membership?.role?.name === 'Owner';
  const isAdmin = org?.membership?.role?.name === 'Admin';

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Settings"
        description="Manage organization settings"
      />
      <UpdateOrganizationForm />
      <Divider text="" />
      {isOwner && <DeleteOrganizationCard onDelete={onDeleteOrganization} />}
    </div>
  );
}

const UpdateOrganizationFormSchema = z.object({
  name: z.string().min(3).max(100),
});

interface UpdateOrganizationFormOptions {
  onCancel?: () => void;
  onSubmit?: (response: FrontendUpdateOrganization200Response) => void;
  afterUpdateOrganizationRedirectUri?: string;
}
export function UpdateOrganizationForm({
  onCancel,
  onSubmit,
  afterUpdateOrganizationRedirectUri,
}: UpdateOrganizationFormOptions) {
  const { orgId, navigate } = useProtocolAuth();
  const { organizations, isUpdating, updateOrganization, updateError } =
    useProtocolAuthOrganizationsList({});

  const org = organizations?.data?.find((org) => org.id === orgId);

  const form = useForm<z.infer<typeof UpdateOrganizationFormSchema>>({
    resolver: zodResolver(UpdateOrganizationFormSchema),
    defaultValues: {
      name: org?.name,
    },
  });

  async function handleFormSubmit(
    values: z.infer<typeof UpdateOrganizationFormSchema>,
  ) {
    const response = await updateOrganization({ name: values.name });
    if (response.status === ResponseStatus.Success) {
      navigate(
        `${afterUpdateOrganizationRedirectUri}?organizationId=${response.data?.organization.id}`,
      );
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Name</FormLabel>
              </div>
              <FormControl>
                <Input name="name" placeholder="Acme, Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {updateError && <FormMessage>{updateError}</FormMessage>}

        <div className="flex flex-col gap-1">
          <LoadingButton
            type="submit"
            variant="default"
            className="w-full uppercase"
            disabled={isUpdating}
            loading={isUpdating}
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
