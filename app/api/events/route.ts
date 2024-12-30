import { NextRequest } from "next/server";
import { prisma } from "@/db/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { Event } from "@prisma/client";

export async function GET() {
    const events = await prisma.event.findMany({ include: { producer: true } });

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
        
        const newEvent = await prisma.event.create({
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