import { getUserRole } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    // Security checks
    if (req.method !== "GET") return ErrorResponse("method not allowed", 405);

    const role = await getUserRole();
    if (!["PRODUCER", "USER"].includes(role??"")) return ErrorResponse("forbidden",403);
    
    const now = new Date();

    const events = await prisma.event.findMany({
        where: {
            TicketBatch: {
                some: {
                    active: true,
                    end_date: {
                        gt: now
                    }
                }
            }
        },
        include: {
            TicketBatch: {
                where: {
                    active: true,
                    end_date: {
                        gt: now
                    }
                }
            },
            producer: true
        }
    });

    return GenericResponse(events, 200);
}