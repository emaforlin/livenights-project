"use client";

import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext";

const formSchema = z.object({
    username: z.string().min(4, {
        message: "Usuario debe tener al menos 2 caracteres.",
    }),
    safetyCheck: z.literal(true, {
        errorMap: () => ({message: "Debes aceptar para continuar."}),
    })
});

export function UpgradeRoleForm() {
    const {data: session} = useSession();
    const { setRole } = useRole();
    
    const router = useRouter();

    
    const userId = session?.user?.id;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },

    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch(`/api/users/${userId}`,{
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                role: "PRODUCER",
                username: values.username
            })

        });
        if (res.ok) {
            setRole("PRODUCER");
            router.push("/settings");
        }

    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField 
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex text-start text-lg">Nombre de la Organizacion</FormLabel>
                            <FormControl>
                                <Input placeholder="Livenights Producciones" type="text" {...field} />
                            </FormControl>
                            <FormDescription>Conviertete en productor de eventos de forma simple</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="safetyCheck"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}  
                                />
                            </FormControl>
                            <div className="leading-none">
                                <FormLabel>Entiendo y acepto que esta accion sera irreversible.</FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="destructive">Continuar</Button>
            </form>
        </Form>
    );
}