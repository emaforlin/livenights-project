"use client";

import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Event as DBEvent} from "@prisma/client";

interface Props {
    id: number
}

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
});

const UpdateEventForm = ({ id }: Props) => {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [event, setEvent] = useState<DBEvent|undefined>(undefined);

    const mainForm = useForm<z.infer<typeof creationFormSchema>>({
        resolver: zodResolver(creationFormSchema),
        defaultValues: {
            title: event?.title,
            description: event?.description,
            location: event?.location,
            datetime: event?.date,
        },
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`/api/events/${id}`);
                if (!res.ok) throw new Error("Fallo al obtener información.");
                const data = (await res.json()) as DBEvent;
                setEvent(data);
            } catch (error) {
                console.log((error as Error).message);
            }
        }
        fetchEvent();
    }, [id])

    useEffect(() => {
        if (event) {
            mainForm.reset({
                title: event.title,
                datetime: new Date(event.date),
                description: event.description,
                location: event.location
            })
        }
    },[event, mainForm])

    const onSubmit = async (values: z.infer<typeof creationFormSchema>) => {
        try {
            if (session) {
                const userId = session.user?.id;
                if (!userId) throw new Error("Usuario no encontrado");

                const res = await fetch(`/api/events/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {"Content-Type":"application/json"}
                });
                if (!res.ok) throw new Error("No se pudieron guardar los cambios.");

                toast({
                    title: "Cambios  guardados con éxito.",
                    description: "Los usuario ya pueden notar los cambios.",
                    variant: "default"
                });
            }
        } catch (error: unknown) {
            toast({
                title: "Algo salió mal.",
                description: (error as Error).message,
                variant: "destructive"
            })
        }
    }

    return (<>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Editar</Button>
            </DialogTrigger>
            {/* <DialogContent onClick={handleDialogOpenChange}> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Editar Evento</DialogTitle>
                    <DialogDescription>
                        Realiza cambios en tu evento. Haz click en <strong>Guardar</strong> cuando termines.
                    </DialogDescription>
                </DialogHeader>
                    <Form {...mainForm}>
                        <form onSubmit={mainForm.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-5">
                                <FormField
                                    control={mainForm.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Título</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Fiesta de la agricultura" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>)} />

                                        <FormField
                                            control={ mainForm.control}
                                            name="datetime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block mb-1">Fecha a realizarse</FormLabel>
                                                    <FormControl>
                                                        {/* <DatetimePicker {...field}/> */}
                                                        <Input type="datetime-local" onChange={(e) => field.onChange(new Date(e.target.value))}/>
                                                          
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                <FormField
                                    control={mainForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormControl>
                                                <Input placeholder="La fiesta que celebra el..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={mainForm.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ubicación</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Plaza San Martin, Esperanza, Santa Fe, Argentina" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <Button type="submit" className="w-full h-10 font-bold text-lg">Guardar</Button>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog></>
    )

}
export default UpdateEventForm;