"use client";

import { EventSummary } from "@/types/event";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<EventSummary>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "title",
        header: "Evento"
    }, 
    {
        accessorKey: "date",
        header: "Fecha"
    },
    {
        accessorKey: "location",
        header: "Ubicacion"
    },
    {
        accessorKey: "soldTickets",
        header: "Ventas"
    }
]