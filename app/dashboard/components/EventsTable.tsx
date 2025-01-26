"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "../types/columns";
import { useEventContext } from "@/context/EventContext";
import { summarizeEvents } from "@/app/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const EventsTable = () => {
    const { loading,  events, fetchEventsByProducer } = useEventContext(); 
    const { data: session } = useSession();
    const id = session?.user?.id ? parseInt(session.user.id) : -1;
  
    useEffect(() => {
        fetchEventsByProducer(id);
    }, [id]);

  


    if (loading) return <div className="text-sm text-center">Cargando</div>;
    return (
        <DataTable columns={columns} data={summarizeEvents(events)}/>
    );
};