"use client";

import { Event, User } from "@prisma/client";
import { useState, createContext, ReactNode, useEffect, useContext } from "react";

type EventContextType = {
    events: (Event & {producer: User})[];
    loading: boolean;
    error: Error|null;
    fetchAllEvents: () => Promise<void>;
    fetchEventsByProducer: (producerId: number) => Promise<void>;
    fetchEventById: (eventId: number) => Promise<Event&{producer: User}|null>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<(Event & {producer: User})[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error|null>(null);

    const API_ENDPOINT_URL = "/api/events";

    const fetchAllEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_ENDPOINT_URL);
            if (!res.ok) throw new Error("Error fetching events");
            const data = await res.json();
            setEvents(data);
        } catch (error: any) {
            console.log("DEBUG: error in EventContext:", error);
            setError(error.message)
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
    }

    const fetchEventById = async (eventId: number) => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${API_ENDPOINT_URL}/${eventId}`);
          if (!response.ok) throw new Error('Error fetching event');
          const data = await response.json();
          return data
        } catch (error: any) {
          setError(error.message);
          return null;
        } finally {
          setLoading(false);
        }  
    };

    useEffect(() => {
        fetchAllEvents();
    }, [])

    return (
        <EventContext.Provider value={{events, loading, error, fetchAllEvents, fetchEventById, fetchEventsByProducer}}>
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

