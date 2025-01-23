import { TicketBatch, TicketOrder } from "@prisma/client";

export type EventSummary = {
    id: string;
    title: string;
    date: string;
    soldTickets: number;
}

export type TicketData = TicketOrder&{
    event: Event;
    batch: TicketBatch;
}