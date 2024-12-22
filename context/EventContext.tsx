"use client";

import { useState, createContext, ReactNode, useEffect, useContext } from "react";

import { EventType } from "@/types/event";

type EventContextType = {
    producerId: string;
    selectProducer: (producerId: number) => void;
    events: EventType[];
    fetchEvents: (producerId: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [producerId, setProducerId] = useState<string>("");

    const selectProducer = (producerId: number) => {
        const id = String(producerId);
        setProducerId(id);
    }

    const [events, setEvents] = useState<EventType[]>([]);
    
    const fetchEvents = async (producerId: string) => {
        try {
            const res = await fetch(`/api/events?producer=${producerId}`);
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
        fetchEvents(producerId);
    
    }, [producerId]);

    return (
        <EventContext.Provider value={{events, fetchEvents, producerId, selectProducer}}>
            {children}
        </EventContext.Provider>
    )
}

export const useEventContext = () => {
    const context = useContext(EventContext.Provider);
    if (!context) {
        throw new Error("useEventContext must be used within an EventProvider")
    }
    return context;
}

