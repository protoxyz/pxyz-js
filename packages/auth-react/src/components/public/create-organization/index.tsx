import { AuthComponentType } from "@protoxyz/themes";
import { useProtocolAuthAppearance } from "../../../contexts/protocol-context";
import { CardWrapper } from "../../custom-ui/card-wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProtocolAuthOrganizationsList } from "../../../hooks/useOrganizationsList";
import { CreateOrganization201Response } from "@protoxyz/core";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../custom-ui/form";
import { Spinner } from "../../ui/spinner";
import { ResponseStatus } from "@protoxyz/types";

const CreateOrganizationFormSchema = z.object({
    name: z.string().min(3).max(100),
});

interface CreateOrganizationFormOptions {
    onCancel?: () => void;
    onSubmit?: (response: CreateOrganization201Response) => void;
    afterCreateOrganizationRedirectUri?: string;
}
export function CreateOrganizationForm({
    onCancel,
    onSubmit,
    afterCreateOrganizationRedirectUri,
}: CreateOrganizationFormOptions) {
    const { isCreating, createOrganization, createError } = useProtocolAuthOrganizationsList({});

    const form = useForm<z.infer<typeof CreateOrganizationFormSchema>>({
        resolver: zodResolver(CreateOrganizationFormSchema),
        defaultValues: {
            name: "",
        },
    });

    async function handleFormSubmit(values: z.infer<typeof CreateOrganizationFormSchema>) {
        const response = await createOrganization({ name: values.name });
        if (response.status === ResponseStatus.Success) {
            onSubmit?.(response);
            window.location.href = afterCreateOrganizationRedirectUri ?? "/dashboard";
        }
    }

    function onInvalid(errors: any) {
        console.log(errors);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit, onInvalid)} className="space-y-8">
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

                {createError && <FormMessage>{createError}</FormMessage>}

                <div className="flex flex-col gap-1">
                    <Button type="submit" variant="default" className="w-full uppercase" disabled={isCreating}>
                        {isCreating && <Spinner color="white" />}
                        {!isCreating && "Continue"}
                    </Button>

                    {onCancel && (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onCancel}
                            className="w-full uppercase"
                            disabled={isCreating}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}

interface CreateOrganizationOptions {
    onCancel?: () => void;
    afterCreateOrganizationRedirectUri?: string;
}
export function CreateOrganization({ onCancel, afterCreateOrganizationRedirectUri }: CreateOrganizationOptions) {
    const component: AuthComponentType = "createOrganization";
    const { appearance } = useProtocolAuthAppearance({ component });

    return (
        <CardWrapper component={component}>
            <Card className={appearance?.elements?.card}>
                <CardHeader className={appearance?.elements?.cardHeader}>
                    <CardTitle className={appearance?.elements?.cardHeaderTitle}>Create Organization</CardTitle>
                    <CardDescription className={appearance?.elements?.cardHeaderDescription}></CardDescription>
                </CardHeader>
                <CardContent className={appearance?.elements?.cardContent}>
                    <CreateOrganizationForm
                        onCancel={onCancel}
                        afterCreateOrganizationRedirectUri={afterCreateOrganizationRedirectUri}
                    />
                </CardContent>
                <CardFooter className={appearance?.elements?.cardFooter}></CardFooter>
            </Card>
        </CardWrapper>
    );
}
