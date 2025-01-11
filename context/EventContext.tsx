"use client";

import { useState, createContext, ReactNode, useEffect, useContext } from "react";

import { FullEvent } from "@/types/event";

type EventContextType = {
    events: FullEvent[];
    fetchEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<FullEvent[]>([]);

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/events");
            if (!res.ok) {
                throw new Error("error fetching events");
            }
            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.log("error fetching event", error);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventContext.Provider value={{events, fetchEvents}}>
            {children}
        </EventContext.Provider>
    )
}

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEventContext must be used within an EventProvider")
    }
    return context;
}

