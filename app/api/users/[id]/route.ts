import { prisma } from "@/db/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    const userId = (await params).id;

    const user = await prisma.event.findUnique({
        where: {id: parseInt(userId) },
    });

    if (!user) {
        return ErrorResponse(`user not found`, 404)
    }

    return GenericResponse(user, 200);
}
