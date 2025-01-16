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

import { Event } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { DatetimePicker } from "../../../components/datetime-picker";
import { Card } from "../../../components/ui/card";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { VisibilityWrapper } from "@/components/VisibilityWrapper"
import { useState } from "react";
import { format } from "date-fns";

const fileSchema = z.custom<File>((file) => {
    if (!(file instanceof File)) return false;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
        console.log("File type:", file.type)
        // throw new Error("Solo se acepta formato PNG y JPG");
        return false;
    }

    const maxSize = 1024 * 1024 * 5;
    if (file.size > maxSize) {
        // throw new Error("El archivo debe pesar menos de 5MB");
        return false;
    }

    return true;
}, {
    message: "Archivo invalido",
});


const creationFormSchema = z.object({
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
    image: fileSchema,
})


export function NewEventForm() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [stage, setStage] = useState<number>(0);

    const mainForm = useForm<z.infer<typeof creationFormSchema>>({
        resolver: zodResolver(creationFormSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            datetime: undefined,
            image: undefined,
        },
    });

    async function handleImageUpload() {
        const file = mainForm.getValues("image");
        const data = new FormData();
        data.append("file", file);
        await fetch("/api/images", {
            method: "POST",
            body: data,
        })
    }

    async function onSubmit(values: z.infer<typeof creationFormSchema>) {
        try {
            if (session) {
                const userId = session.user?.id;
                if (!userId) throw new Error("Usuario no encontrado");

                const file = mainForm.getValues("image");
                const filename = values.title.replaceAll(" ","_") + "." + file.type.split("/")[1];

                const data: Partial<Event> = {
                    title: values.title,
                    date: values.datetime,
                    description: values.description,
                    location: values.location,
                    producer_id: parseInt(userId),
                    image: filename,
                };

                

                const res1 = await fetch("/api/events", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data),
                });

                if (!res1.ok) {
                    throw new Error("Falló la creación del evento");
                }

                const event: Event = await res1.json();

                    
                const formData = new FormData();
                formData.append("file", file);
                formData.append("filename", filename);

                await fetch("/api/images", {
                    method: "POST",
                    body: formData,
                })

                mainForm.reset();
                
                toast({
                    title: "Evento creado exitosamente!", 
                    description: "Puedes continuar la configuración desde la pestaña Mis Eventos",
                    variant: "default"
                });
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


    

    return (<>
        <Card className="px-6 py-4 w-96">
                <h1 className="text-2xl text-center font-bold mb-4">Organiza un nuevo evento!</h1>
                <Form {...mainForm}>
                    <form onSubmit={ mainForm.handleSubmit(onSubmit) } className="space-y-4">
                        <div className="my-10 space-y-5">
                            <VisibilityWrapper visible={ stage===0 }>
                                <FormField
                                    control={ mainForm.control }
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
                                    control={ mainForm.control}
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
                                    control={ mainForm.control}
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
                                    control={ mainForm.control}
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
                                <Button onClick={ async () => { await mainForm.trigger(["title", "datetime", "description", "location"]) && setStage(1) } }>
                                        Siguiente
                                </Button>
                            </VisibilityWrapper>

                            <VisibilityWrapper visible={stage === 1}>
                                <FormField
                                    control={ mainForm.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Imagen</FormLabel>
                                            <FormControl>
                                                <Input type="file" onChange={(event: any) => {
                                                    const file: File = event.target.files[0];
                                                    mainForm.setValue("image", file);
                                                }} />
                                            </FormControl>
                                            <FormDescription>
                                                Agrega una imagen para mostrar como portada del evento.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between">
                                    <Button onClick={ () => setStage(0) }
                                        className="w-auto text-center justify-start">Atras</Button>
                                    <Button onClick={ async () => { await mainForm.trigger("image") && setStage(2)} }
                                        className="w-auto text-center justify-end">Siguiente</Button>
                                </div>
                            </VisibilityWrapper>
                        </div>

                        <VisibilityWrapper visible={ stage === 2}>
                            <Button type="submit" className="w-full font-bold text-lg">Crear evento</Button>
                        </VisibilityWrapper>
                    </form>
                </Form>
        </Card>


    </>)
}