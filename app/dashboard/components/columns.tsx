"use client";
 
import { EventSummary } from "@/types/event";
import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<EventSummary>[] = [
    {
        accessorKey: "id",
        header: "#"
    }, {
        accessorKey: "title",
        header: "Titulo",
    }, {
        accessorKey: "date",
        header: "Fecha"
    }, {
        accessorKey: "soldTickets",
        header: "Venta"
    }
]

export default columns