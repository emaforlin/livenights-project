import { ErrorUserNotFound } from "@/app/api/errors";
import { getUserRole } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (request.method !== "GET") 
            return ErrorResponse("method not allowed", 405);
            
        const role = await getUserRole()??"";
        if (role !== "USER") 
            return ErrorResponse("forbidden", 403);

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
    } catch (error: unknown) {
        console.log("something went wrong: ",error);
        return ErrorResponse("bad request", 400);
    }
}