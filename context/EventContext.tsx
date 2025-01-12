"use client";

import { Event, User } from "@prisma/client";
import { useState, createContext, ReactNode, useEffect, useContext } from "react";

type EventContextType = {
    events: (Event & {producer: User})[];
    fetchEvents: () => Promise<void>;
    fetchProducerEvents: () => Promise<void>;
    setProducer: (id: number) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<(Event & {producer: User})[]>([]);
    const [producer, setProducer] = useState<number|undefined>(undefined);

    const fetchEvents = async () => {
        console.log("DEBUG: fetching all events");
        try {
            const res = await fetch("/api/events");
            if (!res.ok) {
                throw new Error("error fetching events");
            }

            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.log("error fetching event", error);
            setEvents([]);
        }
    }

    const fetchProducerEvents = async () => {
        console.log("DEBUG: fetching events by producer");
        try {
            const res = await fetch(`/api/events?producer=${producer}`);
            if (!res.ok) {
                throw new Error("error fetching events");
            }

            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.log("error fetching event", error);
            setEvents([]);
        }
    }

    useEffect(() => {
        if (producer) {
            fetchProducerEvents();
        } else {
            fetchEvents();
        }
    }, [producer]);

    return (
        <EventContext.Provider value={{events, fetchEvents, fetchProducerEvents ,setProducer}}>
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

