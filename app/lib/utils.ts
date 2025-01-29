import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventDetails, EventSummary } from "@/types/event";
import { date2text } from "@/utils/date";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function summarizeEvents(events: EventDetails[]): EventSummary[] {
    const summ = events.map((event) => (
        {
            id: event.id.toString(),
            title: event.title,
            date: date2text(new Date(event.date)),
            producerId: event.producer_id,
            soldTickets: event._count.TicketOrder
        })
    );
    return summ;
}