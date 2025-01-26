import { getUserRole } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        if (req.method !== "DELETE") 
            return ErrorResponse("method not allowed", 405);
                
        const role = await getUserRole()??"";
        
        if (role !== "PRODUCER")
            return ErrorResponse("forbidden", 403);

        const batchId = (await params).id;
        
        const deleted = await prisma.ticketBatch.delete({where: {
            id: parseInt(batchId)
        }});

        if (!deleted) {
            throw new Error("failed to delete ticket batch");
        }

        return GenericResponse({ deleted: deleted.id }, 200);
    } catch (error: unknown) {
        console.log(error);
        return ErrorResponse("bad request", 400);
    }
}