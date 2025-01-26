import { getSession, getUserRole } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";

export async function DELETE(request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Security checks
         if (request.method !== "DELETE") return ErrorResponse("method not allowed", 405);
                
        const role = await getUserRole();
        if (role !== "PRODUCER") return ErrorResponse("forbidden",403);

        const eventId = (await params).id;
        const deleted = await prisma.event.delete({where: {id: parseInt(eventId)}});
        if (!deleted) throw new Error("failed to delete event");
        return GenericResponse({
            deleted: deleted.id
        }, 200);
    } catch (error: unknown) {
        console.log(error);
        return ErrorResponse("bad request", 400);
    }
}

export async function GET(request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    // Security checks
    if (request.method !== "GET") return ErrorResponse("method not allowed", 405);
        
    const session = await getSession();
    if (!session) return ErrorResponse("forbidden", 401);

    
    const eventId = (await params).id;
    const event = await prisma.event.findUnique({
        where: {id: parseInt(eventId) },
        include: {
            TicketBatch: true,
        }
    });

    if (!event) {
        return ErrorResponse(`event with id: ${eventId} not found`, 404);
    }

    return GenericResponse(event, 200);
}

export async function PUT(req: Request, { params }: 
    { params:Promise<{ id: string }> }) {
    
    try {
        // Security checks
        if (req.method !== "PUT") return ErrorResponse("method not allowed", 405);
        
        const role = await getUserRole();
        if (role !== "PRODUCER") return ErrorResponse("forbidden", 403);

        
        const eventId = (await params).id;
        const reqBody = await req.json();
            
        const updatedEvent = await prisma.event.update({
            where: {id: parseInt(eventId)},
            data: {
                title: reqBody.title,
                description: reqBody.description,
                date: new Date(reqBody.date),
                location: reqBody.location,
                producer_id: reqBody.producer_id,
            },
        });

        if (!updatedEvent) {
            return ErrorResponse(`event with id: ${eventId} not found`, 404);
        }

    
        return GenericResponse(updatedEvent, 200);
    
    } catch (error: unknown) {
        console.log("something went wrong: ", error);
        return ErrorResponse("something went wrong :(", 400);
    }
}