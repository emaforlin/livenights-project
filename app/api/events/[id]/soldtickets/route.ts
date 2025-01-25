import { ErrorEventNotFound, ErrorUnauthorized } from "@/app/api/errors";
import { getSession } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    try {
        if (!session || !session.user || !session.user.id) 
            return ErrorResponse(ErrorUnauthorized.message, 401);

        const eventId = (await params).id;        
        const id = parseInt(eventId);
        
        const found = await prisma.event.findUnique({ where: {id }, include: {producer: true}});
        if (!eventId || !found) 
            return ErrorResponse(ErrorEventNotFound.message, 404);

        if (found.producer_id !== parseInt(session.user.id)) 
            return ErrorResponse(ErrorUnauthorized.message, 403);

        const soldTickets = await prisma.ticketOrder.count({
            where: {
                event_id: id
            }
        });
        return GenericResponse({soldTickets}, 200);
        
    } catch (error: any) {
        return ErrorResponse("bad request", 400);
    }


}