import { prisma } from "@/app/lib/db";
import { GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ uid: string }> }) {
    const ticketUid = (await params).uid;

    const ticketUsedAt = await prisma.ticketOrder.findUnique({
        where: {
            uid: ticketUid
        },
        select: {
            usedAt: true
        }
    });

    return GenericResponse({used: !!ticketUsedAt}, 200);
}