import { getSession, getUserRole } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";
import { ErrorUnauthorized } from "../../errors";

export async function GET(req: NextRequest, { params }: { params: Promise<{ uid: string }> }) {
    try {
        if (req.method !== "GET") 
            return ErrorResponse("method not allowed", 405);

        const role = await getUserRole();
        if (!["PRODUCER", "STAFF"].includes(role??"")) 
            return ErrorResponse(ErrorUnauthorized.message, 401);


        const ticketUid = (await params).uid;
        const foundTicket = await prisma.ticketOrder.findUnique({
            where: {
                uid: ticketUid
            },
        });

        if (!foundTicket) return ErrorResponse("error ticket not found", 404);

        if (foundTicket.usedAt) {
            return GenericResponse({
                message: "ticket already used",
                valid: false,
                used_at: foundTicket.usedAt,
            }, 200);
        } else {
            const res = await prisma.ticketOrder.update({
                where: { uid: ticketUid },
                data: {
                    usedAt: new Date()
                }
            });
            return GenericResponse({
                message: "valid ticket",
                valid: true,
                used_at: res.usedAt
            }, 200);   
        }
    } catch (error) {
        return ErrorResponse("bad request", 400);
    }
}