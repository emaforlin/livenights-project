import { prisma } from "@/db/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { Event } from "@prisma/client";

export async function DELETE(request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const eventId = (await params).id;

    const {id} = await prisma.event.delete({where: {id: parseInt(eventId) }});

    if (!id) {
        return ErrorResponse(`event with id: ${eventId} not found`, 404)
    }

    return GenericResponse({"message": `deleted event with id: ${id}`}, 200);
}

export async function GET(request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const eventId = (await params).id;

    const event = await prisma.event.findUnique({
        where: {id: parseInt(eventId) },
    });

    if (!event) {
        return ErrorResponse(`event with id: ${eventId} not found`, 404)
    }

    return GenericResponse(event, 200);
}

export async function PUT(req: Request, { params }: 
    { params:Promise<{ id: string }> }) {
    
    try {
            // *****************************
            // * check for `producer` role *
            // *****************************
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
                return ErrorResponse(`event with id: ${eventId} not found`, 404)
            }

    
            return GenericResponse(updatedEvent, 200);
    
        } catch (error: any) {
            console.log("something went wrong: ", error.message);
            return ErrorResponse("something went wrong :(", 400);
        }
}