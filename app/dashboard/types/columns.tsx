"use client";

import { EventSummary } from "@/types/event";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import UpdateEventForm from "@/components/UpdateEventForm";

export const columns: ColumnDef<EventSummary>[] = [
    {
        accessorKey: "id",
        header: "#",
    },
    {
        accessorKey: "title",
        header: "Evento",
    },
    {
        accessorKey: "date",
        header: "Fecha",
    },
    {
        accessorKey: "soldTickets",
        header: "Ventas",
    },
    {
        id: "eliminar",
        enableHiding: false,
        cell: ({ row }) => 
            
        <Button onClick={() => handleDelete(parseInt(row.original.id))}
            variant="destructive"
            className="h-8 w-16">
            Eliminar
        </Button> // Usar un componente separado para la celda
    },
    {
        id: "editar",
        enableHiding: false,
        cell: ({ row }) => <UpdateEventForm id={parseInt(row.original.id)} />
    }
];

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