"use client";

import { Card } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerWithRange } from "@/components/daterange-picker";
import { toast, useToast } from "@/hooks/use-toast";
import { TicketBatch } from "@prisma/client";
import { useSearchParams, useRouter } from "next/navigation";


const dateRangeSchema = z.object({
    from: z.date({
      required_error: "La fecha de inicio es obligatoria.",
      invalid_type_error: "Debe ser una fecha válida.",
    }).refine((date) => { 
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establece la hora a las 00:00 para comparar solo las fechas
        return date >= today;
    }, { message: "Esta fecha no puede ser anterior a hoy" }),
    
    to: z.date({
      required_error: "La fecha de fin es obligatoria.",
      invalid_type_error: "Debe ser una fecha válida.",
    }).refine((date) => !date || date > new Date(), { message: "Esta fecha debe ser futura" }),

  }).refine(
    ({ from, to }) => from <= to,
    {
      message: "La fecha de inicio debe ser anterior o igual a la fecha de fin.",
      path: ["end_date"], // Marca `end_date` como la fuente del error
    }
  );

const ticketBatchSchema = z.object({
    name: z
        .string({ required_error: "Campo requerido." })
        .min(4, { message: "nombre demasiado corto." })
        .max(60, { message: "nombre demasiado largo." }),
    
    price: z
        .number({ required_error: "Campo requerido" })
        .gte(0, { message: "Valor fuera de rango."}),
    
    quantity: z
        .number({ required_error: "Ingrese un valor." })
        .int()
        .gt(0, { message: "valor fuera de rango." }),

    date_range: dateRangeSchema,

    active: z.boolean().optional().default(false),
})

export function TicketBatchForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const eventId = searchParams.get("event");

    const { toast } = useToast();

    const form = useForm<z.infer<typeof ticketBatchSchema>>({
        resolver: zodResolver(ticketBatchSchema),
        defaultValues: {
            name: "",
            price: undefined,
            quantity: 0,
            date_range: undefined,
            active: false,
        },
    })

    const onSubmit = async (values: z.infer<typeof ticketBatchSchema>) => {
        try {
            if (!eventId) throw new Error("No se pudo sincronizar el evento correspondiente.");

            const data: Omit<TicketBatch, "id"|"active"> = {
                name: values.name,
                price: values.price,
                quantity: values.quantity,
                start_date: values.date_range.from,
                end_date: values.date_range.to,
                event_id: parseInt(eventId)
            }

            console.log(data);


            const res = await fetch("/api/tickets/batches", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error("Falló la creación de la tanda de tickets.")
            }
            
            form.reset();

            toast({
                title: "Tanda creada exitosamente.",
                description: "Ahora puedes crear otra si lo deseas."
            })
    
        } catch (error: any) {
            console.log(error.message);

            toast({
                title: "Algo salió mal.",
                description: error.message,
                variant: "destructive"
            });

            router.push("");
        }            
    };

    return (<Card className="px-6 py-4 w-96">
        <h1 className="text-2xl text-center font-bold mb-4">Agrega una nueva tanda de Tickets.</h1>
        <Form {...form}>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">
                <div className="my-10 space-y-2">
                    <FormField
                        control={ form.control }
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej. (Preventa, Primera Tanda)" {...field} />
                            </FormControl>
                            <FormDescription>
                                Nombre de la tanda.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={ form.control }
                        name="price"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ej. ($ 8000)" {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    onReset={() => field.value=0}/>
                            </FormControl>
                            <FormDescription>
                                Precio de la tanda.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={ form.control }
                        name="quantity"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ej. (2000)" {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}/>
                            </FormControl>
                            <FormDescription>
                                Máximo de tickets disponibles en la tanda.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={ form.control }
                        name="date_range"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Activo durante</FormLabel>
                            <FormControl>
                                <DatePickerWithRange {...field} 
                                    value={field.value} 
                                    onChange={(range) => field.onChange(range)}
                                    />
                            </FormControl>
                            <FormDescription>
                                La tanda estará permanecerá activa durante estas fechas o hasta que se agoten los tickets, o bien, sea desactivada manualmente.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full h-14 font-bold text-lg">Crear Tanda</Button>
            </form>
        </Form>
    </Card>
    )
}