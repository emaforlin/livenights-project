import { ErrorUserNotFound } from "@/app/api/errors";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = (await params).id;
        if (!userId) throw ErrorUserNotFound;
        const userTickets = await prisma.ticketOrder.findMany({
            where: {
                user_id: parseInt(userId)
            },
            include: {
                event: true,
                batch: true,
            }
        });

        if (!userTickets) return ErrorResponse("no tickets found", 404);
        return GenericResponse(userTickets, 200);
    } catch (error: any) {
        return ErrorResponse(error.message, 404);
    }
}