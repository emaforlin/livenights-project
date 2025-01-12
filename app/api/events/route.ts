import { NextRequest } from "next/server";
import { db } from "@/db/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { Event, User } from "@prisma/client";
import { getSession, getUserRoles } from "@/app/lib/dal";

export async function GET(req: NextRequest) {
    const producerId = req.nextUrl.searchParams.get("producer");
    
    try {
        let events: any;
        if (producerId) {
            events = await db.event.findMany({
                where: { producer_id: parseInt(producerId) },
                include: { producer: true } 
            });
        } else {
            events = await db.event.findMany({ 
                include: { producer: true } 
            });
        }
        if (events.length < 1) {
            return ErrorResponse("events not found", 404);
        }
        return GenericResponse(events, 200);
    } catch (error) {
        return ErrorResponse("error fetching events", 400);
    }


}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return ErrorResponse("unauthorized", 401);
        }
        console.log(session);

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
                producer: {
                    connect: {
                        id: parseInt(reqBody.producer_id)
                    }
                }
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