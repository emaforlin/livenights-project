"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const registerFormSchema = z.object({
    email: z
        .string({required_error: "campo requerido"})
        .email({message: "email invalido"})
        .trim(),
    name: z
        .string({required_error: "campo requerido"})
        .min(2, {message: "debe tener al menos 2 caracteres"})
        .max(70, {message: "camponombre demasiado largo"})
        .trim(),
    username: z
        .string({required_error: "campo requerido"})
        .min(4, {message: "debe tener al menos 4 caracteres"})
        .max(32, {message: "nombre de usuario demasiado largo"})
        .trim(),
    password: z
        .string({required_error: "campo requerido"})
        .min(8, {message: "debe tener al menos 8 caracteres"})
        .max(70, {message: "contraseña demasiado larga"})
        .trim(),
});

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
    });

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(values)
            });

            console.log(values);
            if (!res.ok) throw new Error("No se pudo completar el registro");

            toast({title: "Ya puedes loguearte en tu cuenta!"});
            
            router.push("/auth/login");
        } catch (error: unknown) {
            toast({
                title: "Algo salió mal.", 
                description: (error as Error).message, 
                variant: "destructive"
            });
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className||"")} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Registrate</CardTitle>
                    <CardDescription>Completa el formulario para crear tu cuenta.
                    O <Link href="/auth/login" className="text-gray-800 hover:underline">Inicia Sesión</Link> con tu cuenta de Google
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre Completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Emanuel Forlin" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Correo electrónico</FormLabel>
                                            <FormControl>
                                                <Input placeholder="yo@ejemplo.com" {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="username"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nombre de usuario</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full h-14 font-bold text-lg">Crear Tanda</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
export default RegisterForm;