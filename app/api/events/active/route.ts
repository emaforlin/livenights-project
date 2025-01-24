import { prisma } from "@/app/lib/db";
import { GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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
    })

    return GenericResponse(events, 200);
}