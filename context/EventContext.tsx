"use client";

import { EventDetails } from "@/types/event";
import { useState, createContext, ReactNode, useContext } from "react";

type EventContextType = {
    events: EventDetails[];
    loading: boolean;
    error: Error|null;
    fetchAllEvents: () => Promise<void>;
    fetchEventsByProducer: (producerId: number) => Promise<void>;
    fetchEventById: (eventId: number) => Promise<EventDetails|null>;
    fetchActiveEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<EventDetails[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error|null>(null);

    const API_ENDPOINT_URL = "/api/events";

    const fetchActiveEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_ENDPOINT_URL+"/active");
            if (!res.ok) throw new Error("Error fetching events");
            const data = await res.json();
            setEvents(data);
        } catch (error: unknown) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_ENDPOINT_URL);
            if (!res.ok) throw new Error("Error fetching events");
            const data = await res.json();
            setEvents(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
   
    const fetchEventsByProducer = async (producerId: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_ENDPOINT_URL}?producer=${producerId}`);
            if (!res.ok) throw new Error("Error fetching producer events");
            const data = await res.json();
            setEvents(data);
        } catch (error: any) {
            console.log("DEBUG: error in EventContext:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchEventById = async (eventId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_ENDPOINT_URL}/${eventId}`);
            if (!response.ok) throw new Error('Error fetching event');
            const data = await response.json();
            return data;
        } catch (error: unknown) {
            setError((error as Error));
            return null;
        } finally {
            setLoading(false);
        }  
    };


    return (
        <EventContext.Provider value={{events, loading, error, fetchAllEvents, fetchEventById, fetchEventsByProducer, fetchActiveEvents}}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEventContext must be used within an EventProvider");
    }
    return context;
};

