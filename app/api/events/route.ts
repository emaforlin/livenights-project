import { NextRequest } from "next/server";
import { db } from "@/db/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { Event } from "@prisma/client";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const producerId = searchParams.get("producer");

    console.log(producerId);

    if (producerId) {
        const events = await prisma.event.findMany({where: {
            producer_id: parseInt(producerId)
        }});
        if (events.length < 1) {
            return ErrorResponse("the user has no events created yet.", 404);
        }

        return GenericResponse(events, 200);
    }

    const events = await prisma.event.findMany();
    return GenericResponse(events, 200);
}

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const expectedFields: (keyof Event)[] = ["title", "description", "producer_id", "date", "location"]
        const missingFields = expectedFields.filter(f => !(f in reqBody))
        
        if (missingFields.length > 0) {
            return ErrorResponse(`error missing fields: ${missingFields}`, 400);
        }
        
        const newEvent = await db.event.create({
            data: {
                title: reqBody.title,
                description: reqBody.description,
                date: new Date(reqBody.date),
                location: reqBody.location,
                producer_id: reqBody.producer_id,
            },
            include: {
                producer: false
            }
        });

        return GenericResponse(newEvent, 201);

    } catch (error: any) {
        console.log("something went wrong: ", error.message);
        return ErrorResponse("something went wrong :(", 400);
    }
}