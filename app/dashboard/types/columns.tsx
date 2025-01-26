"use client";

import { useEventContext } from "@/context/EventContext";
import { useToast } from "@/hooks/use-toast";
import { EventSummary } from "@/types/event";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionCell event={row.original} />, // Usar un componente separado para la celda
    },
];

// Componente funcional para manejar la lógica de la celda de acciones
const ActionCell = ({ event }: { event: EventSummary }) => {
    const { toast } = useToast();
    const { fetchEventsByProducer } = useEventContext();

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/events/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("No se pudo eliminar el evento.");

            toast({ title: "Evento eliminado exitosamente." });
            fetchEventsByProducer(event.producerId);
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

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem>
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete(parseInt(event.id))}
                    >
            Eliminar
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
