"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "../types/columns";
import { useEventContext } from "@/context/EventContext";
import { summarizeEvents } from "@/app/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import UpdateEventForm from "@/components/UpdateEventForm";

export const EventsTable = () => {
    const { loading,  events, fetchEventsByProducer } = useEventContext(); 
    const { data: session } = useSession();
    const id = session?.user?.id ? parseInt(session.user.id) : -1;
    const { toast } = useToast();

  
    useEffect(() => {
        fetchEventsByProducer(id);
    }, [id]);

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/events/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("No se pudo eliminar el evento.");

            toast({ title: "Evento eliminado exitosamente." });
        } catch (error: unknown) {
            const errorMessage =
        error instanceof Error ? error.message : "Algo salió mal";
            toast({
                title: errorMessage,
                description: "Primero debes eliminar las tandas de tickets asociadas",
                variant: "destructive",
            });
        }
    };


    if (loading) return <div className="text-sm text-center">Cargando</div>;
    return (<>
        <DataTable columns={columns} data={summarizeEvents(events)} />
        </>
    );
    // return (
    //     <div className="w-full border rounded-lg overflow-hidden">
    //       <table className="w-full">
    //         <thead className="bg-gray-100 border-b">
    //           <tr>
    //             <th className="p-2 text-left">#</th>
    //             <th className="p-2 text-left">Titulo</th>
    //             <th className="p-2 text-left">Fecha</th>
    //             <th className="p-2 text-left">Vendidos</th>
    //             <th className="p-2 text-left"></th>
    //             <th className="p-2 text-left"></th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {events.map((event) => (
    //             <tr key={event.id} className="border-b last:border-b-0 hover:bg-gray-50">
    //               <td className="px-3">{event.id}</td>
    //               <td className="px-3">{event.title}</td>
    //               <td className="px-3">{new Date(event.date).toDateString()}</td>
    //               <td className="px-3">{event._count.TicketOrder}</td>
    //               <td><UpdateEventForm event={event}/></td>
    //               <td className="px-3">
    //                 <Button onClick={() => handleDelete(event.id)}
    //                     variant="destructive">Eliminar</Button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   );
    };