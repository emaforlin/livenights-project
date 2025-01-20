"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "../types/columns";
import { useEventContext } from "@/context/EventContext";
import { summarizeEvents } from "@/app/lib/utils";
import { useSession } from "next-auth/react";

export const EventsTable = () => {
  const { events, setProducer } = useEventContext(); 
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="text-sm text-center">Cargando</div>
  

  setProducer(parseInt(session?.user?.id!));

  return (
    <DataTable columns={columns} data={summarizeEvents(events)}/>
  )
}