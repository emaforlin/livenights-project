"use client";

import { ColumnDef } from "@tanstack/react-table";

export type EventData = {
    id: number;
    title: string;
    date: string;
    location: string;
}

export const columns: ColumnDef<EventData[]> = [
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
]