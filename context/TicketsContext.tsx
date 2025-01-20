"use client";

import { Event, TicketBatch } from "@prisma/client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TicketsContextType = {
    event: Event | undefined;
    setEvent: (event_id: number) => void
    batches: TicketBatch[];
    fetchTicketBatches: () => Promise<void>;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
    const [event, setEvent] = useState<number|undefined>(undefined);
    const [eventData, setEventData] = useState<Event|undefined>(undefined);

    const [batches, setBatches] = useState<TicketBatch[]>([]);

    const fetchEvent = async () => {
        try {
            const res = await fetch(`/api/events/${event}`);
            if (!res.ok) throw new Error("failed to fetch ticket batches");

            const data: Event = await res.json();
            setEventData(data);
        } catch (error: any) {
            console.log(error.message);
        }   
    }

    const fetchTicketBatches = async () => {
        try {
            if (!event) throw new Error("failed to set event");

            const res = await fetch(`/api/tickets/batches?event=${event}`);
            if (!res.ok) throw new Error("failed to fetch ticket batches");

            const data: TicketBatch[] = await res.json();
            setBatches(data);
        } catch (error: any) {
            setBatches([]);
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (event) {
            fetchEvent();
            fetchTicketBatches();
        }
    }, [event])

    return (
        <TicketsContext.Provider value={{event: eventData, setEvent, batches, fetchTicketBatches}}>
            {children}
        </TicketsContext.Provider>
    )
}

export const useTicketContext = () => {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error("useTicketContext must be used within a TicketProvider");
    }
    return context;
}


