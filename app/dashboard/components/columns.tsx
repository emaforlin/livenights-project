"use client";
 
import { ColumnDef } from "@tanstack/react-table"

export type Event = {
    id: string;
    title: string;
    date: string;
    soldTickets: number;
}

export const columns: ColumnDef<Event>[] = [
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