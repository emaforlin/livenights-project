"use client";

import { Event, TicketBatch } from "@prisma/client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TicketsContextType = {
    loadingBatches: boolean;
    setEventId: (id: number) => void;
    event: Event|undefined;
    ticketBatches: TicketBatch[];
    fetchTicketBatches: () => Promise<void>;

}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
    const [loadingBatches, setLoadingBatches] = useState<boolean>(false);
    const [eventId, setEventId] = useState<number|undefined>(undefined);
    const [event, setEvent] = useState<Event|undefined>(undefined);
    const [ticketBatches, setTicketBatches] = useState<TicketBatch[]>([]);

    const fetchEvent = async () => {
        try {
            if (eventId) {
                const res = await fetch(`/api/events/${eventId}`);
                if (!res.ok) throw new Error("failed to fetch event");

                const data: Event = await res.json();
                setEvent(data);
            }
        } catch (error: any) {
            console.log("DEBUG:", error.message);
            setEvent(undefined);
        }
    }


    const fetchTicketBatches = async () => {
        setLoadingBatches(true);
        try {
            const res = await fetch(`/api/tickets/batches?event=${eventId}`);
            if (!res.ok) throw new Error("failed to fetch ticket batches");

            const data: TicketBatch[] = await res.json();
            setTicketBatches(data);
        } catch (error: any) {
            setTicketBatches([]);
            console.log(error.message);
        } finally {
            setLoadingBatches(false);
        }
    }

    useEffect(() => {
        if (eventId) {
            fetchTicketBatches();
            fetchEvent();
        }
    }, [eventId])

    return (
        <TicketsContext.Provider value={{loadingBatches, setEventId,ticketBatches, fetchTicketBatches, event}}>
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


