import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const batchId = (await params).id;
        
        const deleted = await prisma.ticketBatch.delete({where: {
            id: parseInt(batchId)
        }});

        if (!deleted) {
            throw new Error("failed to delete ticket batch");
        }

        return GenericResponse({ deleted: deleted.id }, 200);
    } catch (error: any) {
        console.log(error.message);
        return ErrorResponse(error.message, 400);
    }
}