"use client";

import { useEventContext } from "@/context/EventContext";
import { EventDropdown  } from "./components/EventDropdown";
import { useTicketContext } from "@/context/TicketsContext";
import { Event } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { TicketBatchTable } from "./components/TicketbatchTable";

function TicketsDashboard() {
    const {data: session } = useSession();
    const { setProducer } = useEventContext();
    const { batches, setEvent, fetchTicketBatches } = useTicketContext();


    useEffect(() => {
        if (session?.user) {
            const producerId = parseInt(session.user.id!);
            setProducer(producerId);
        }
    }, [session, ])


    return (
        <div className="w-full">
            <div className="mx-4 flex-grow">
                <h1 className="text-2xl text-center font-bold">Administra las Tandas de Tickets</h1>
                <EventDropdown />
                <TicketBatchTable />
            </div>
        </div>
    )
}
export default TicketsDashboard;