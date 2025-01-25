import { User, Event, TicketBatch, TicketOrder } from "@prisma/client";

export type EventSummary = {
    id: string;
    title: string;
    date: string;
    soldTickets: number;
    producerId: number
}

export type TicketData = TicketOrder&{
    event: Event;
    batch: TicketBatch;
}

export type EventDetails = Event & {
    TicketBatch: TicketBatch[];
    producer: User
    _count: {
        TicketOrder: number;
    }
}