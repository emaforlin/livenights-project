import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { Event, User } from "@prisma/client";
import { getSession } from "@/app/lib/dal";

export async function GET(req: NextRequest) {
    const producerId = req.nextUrl.searchParams.get("producer");
    try {
        let events: any;
        if (producerId) {
            events = await prisma.event.findMany({
                where: { producer_id: parseInt(producerId) },
                select: {
                    id: true,
                    date: true,
                    description: true,
                    image: true,
                    location: true,
                    TicketBatch: true,
                    title: true,
                    producer: true,
                    _count: {
                        select: {
                            TicketOrder: true
                        }
                    }
                }
            });
        } else {
            events = await prisma.event.findMany({ 
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
        // const session = await getSession();
        // if (!session) {
        //     return ErrorResponse("unauthorized", 401);
        // }
        
        const reqBody = await req.json();
        const expectedFields: (keyof Event)[] = ["title", "description", "producer_id", "date", "location", "image"]
        const missingFields = expectedFields.filter(f => !(f in reqBody))
        
        if (missingFields.length > 0) {
            console.log("missing fields:",missingFields);
         
            return ErrorResponse(`error missing fields: ${missingFields}`, 400);
        }

        const dbProducer = await prisma.user.findUnique({where: {id: reqBody.producer_id}});

        if  (!dbProducer) {
            return ErrorResponse("bad user input", 400);
        }
        
        const newEvent = await prisma.event.create({
            data: {
                title: reqBody.title,
                description: reqBody.description,
                date: new Date(reqBody.date),
                location: reqBody.location,
                image: `${dbProducer?.username}_${reqBody.image!}`,
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