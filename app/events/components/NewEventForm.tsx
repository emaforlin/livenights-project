"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DatetimePicker } from "../../../components/datetime-picker";
import { Card } from "../../../components/ui/card";
import { Event } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const fileSchema = z.custom<File>((file) => {
    if (!(file instanceof File)) return false;

    
    const maxSize = 1024 * 1024 * 5;
    if (file.size > maxSize) {
        throw new Error("El archivo debe pesar menos de 5MB");
    }
    
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
        console.log("File type:", file.type)
        throw new Error("Solo se acepta formato PNG y JPG");
    }

    return true;
}, {
    message: "Archivo invalido"
});


const formSchema = z.object({
    title: z
        .string()
        .min(3, {message: "Titulo debe tener al menos 3 caracteres."})
        .max(150, {message: "Titulo no puede tener mas de 150 caracteres."}),
    description: z
        .string()
        .min(6, {message: "La descripción debe ser mas larga."})
        .max(300, "Descripcion muy larga."),
    datetime: z
        .date({required_error: "La fecha es oblicatoria."})
        .refine((date) => date>= new Date(), {
            message: "La fecha debe ser futura.",
        }),
    location: z
        .string({message: "Campo ubicacion requerido"}).min(5, {message: "Campo ubicacion muy corto."})
        .max(200, {message: "Ubicacion demasiado extensa."}),
})

export function NewEventForm() {
    const { data: session } = useSession();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            datetime: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (session) {
                console.log("file on Form:", values.image)
                const userId = session.user?.id;
                if (!userId) throw new Error("Usuario no encontrado");

                const data: Partial<Event> = {
                    title: values.title,
                    date: values.datetime,
                    description: values.description,
                    location: values.location,
                    producer_id: parseInt(userId)
                };

                const res = await fetch("/api/events", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data),
                });

                if (!res.ok) {
                    throw new Error("Falló la creación del evento");
                }
                toast({title: "Evento creado existosamente!"});
                form.reset();
            } else {
                throw new Error("no session found");
            }
        } catch (error: any) {
           toast({
            title: "Algo no ha salido según lo esperado.", 
            description: error.message || "Intenta de nuevo mas tarde :(",
            variant: "destructive"
        });
        }
    }

    return (
        <Card className="px-6 py-4 w-96">
            <h1 className="text-2xl text-center font-bold mb-4">Organiza un nuevo evento!</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="my-10 space-y-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Fiesta de la agricultura" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Usa un título distintivo para que tu evento sea encontrado facilmente.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="datetime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1">Fecha a realizarse</FormLabel>
                                    <FormControl>
                                        <DatetimePicker {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                    Elije la fecha de tu evento.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Input placeholder="La fiesta que celebra el..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Añade una descripción a tu evento.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ubicación</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Plaza San Martin, Esperanza, Santa Fe, Argentina" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Indica la ubicacion en donde se realizara el evento.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imagen</FormLabel>
                                    <FormControl>
                                        <Input type="file" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Agrega una imagen para mostrar como portada del evento.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full font-bold text-lg">Crear</Button>
                </form>
            </Form>
        </Card>
    )
}