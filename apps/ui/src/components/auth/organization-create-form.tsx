"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod"; 
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod" 
import { createOrganization } from "@protoxyz/auth/actions";
 

const formSchema = z.object({
    name: z.string({
        required_error: "Please enter your organization name",
    }).min(3).max(100),

})

export default function OrganizationCreateForm() { 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    async function handleFormSubmit(
        values: z.infer<typeof formSchema>
    ) {
       await createOrganization(values);
    }

    return (
        <Form {...form}> 
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-12"
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
                                <Input placeholder="Acme, Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> 

                <Button type="submit" variant="default" className="w-full uppercase">
                    Create Organization
                </Button>
            </form>
        </Form>
    );
}