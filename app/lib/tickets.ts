import { Event, TicketBatch, TicketOrder } from "@prisma/client";
import { prisma } from "./db";
import { ErrorBatchNotFound, ErrorEventNotFound, ErrorSoldOut } from "../api/errors";

export interface PayloadOrder {
    eventId: number;
    batchId: number;
    userId: number;
    quantity: number;
    description: string;
}


export async function BuyTicketProcess(payload: Omit<PayloadOrder, "description">): Promise<TicketOrder[]> {
    const event: Event|null = await prisma.event.findUnique({ where: { id: payload.eventId }});
    if (!event) throw ErrorEventNotFound;

    const today = new Date;    
    const ticketBatch: TicketBatch|null = await prisma.ticketBatch.findUnique(
        { 
            where: { 
            id: payload.batchId,
                AND: {
                    active: true,
                    end_date: { gt: today },
                    start_date: { lte: today }
                }
            }
        }
    );

    if (!ticketBatch) throw ErrorBatchNotFound;

    if (ticketBatch.quantity < payload.quantity) throw ErrorSoldOut;
    
    // decrement the available tickets count
    await prisma.ticketBatch.update({
        where: { id: ticketBatch.id },
        data: { quantity: ticketBatch.quantity - payload.quantity }
    });

    const ordersData = Array.from( {length: payload.quantity },
        () => ({
            description: `Ticket para ${event.title}`,
            user_id: payload.userId
        })
    )
    
    const orders = await Promise.all(
        ordersData.map((item) =>
            prisma.ticketOrder.create({ data: item })
        )
    )

    return orders;
}