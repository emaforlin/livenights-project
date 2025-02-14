import { getUserRole } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { TicketBatch } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const ticketBatchSchema = z.object({
    name: z
        .string({ required_error: "name is required field" })
        .min(4, { message: "name is too short" })
        .max(60, { message: "name is too long" }),
    
    price: z
        .number({ required_error: "price is a required field" })
        .gte(0, { message: "number out of range "}),
    
    quantity: z
        .number({ required_error: "quantity is a required field" })
        .int()
        .gt(0, { message: "number out of range" }),

    start_date: z
        .preprocess((value) => (typeof value === "string" ? new Date(value) : value), z.date())
        .refine((date) => { 
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Establece la hora a las 00:00 para comparar solo las fechas
            return date >= today;
        }, { message: "date must to be on the future" }),

    end_date: z
        .preprocess((value) => (typeof value === "string" ? new Date(value) : value), z.date())
        .refine((date) => !date || date > new Date(), { message: "date must to be on the future" }),
        
    active: z.boolean().optional().default(true),

    event_id: z
        .number( { message: "event_id field required" })
        .int()
        .gt(0, { message: "invalid event id" })
});

export async function POST(req: NextRequest) {
    try {
        if (req.method !== "POST") 
            return ErrorResponse("method not allowed", 405);
        
        const role = await getUserRole()??"";

        if (role !== "PRODUCER") 
            return ErrorResponse("forbidden", 403);

        const reqBody = await req.json();

        const result =  ticketBatchSchema.safeParse(reqBody);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            }));
            
            const friendlyMessage = errors
                .map((error) => `${error.path}: ${error.message}`)
                .join("\n");
            throw new Error(friendlyMessage);
        }
      
        const tbData: Omit<TicketBatch, "id"> = result.data!;

        const dbTB = await prisma.ticketBatch.create({
            data: {
                name: tbData.name,
                price: tbData.price,
                quantity: tbData.quantity,
                start_date: tbData.start_date,
                end_date: tbData.end_date,
                active: tbData.active,
                event: {
                    connect: {
                        id: tbData.event_id
                    }
                }
            }
        });

        if (!dbTB) {
            throw new Error("couldn't save ticket batch");            
        }

        return GenericResponse(dbTB, 201);

    } catch (error: unknown) {
        console.log(error);
        return ErrorResponse("bad request", 400);
    }
}

export async function GET(req: NextRequest) {
    try {
        if (req.method !== "GET") 
            return ErrorResponse("method not allowed", 405);
        
        const role = await getUserRole()??"";

        if (!["PRODUCER", "USER"].includes(role)) 
            return ErrorResponse("forbidden", 403);

        const eventId = req.nextUrl.searchParams.get("event");
        if (!eventId) {
            throw new Error("event id required");
        }

        const dbTicketBatches: TicketBatch[] = await prisma.ticketBatch.findMany({ where: {
            event_id: parseInt(eventId)
        }});

        if (dbTicketBatches.length < 1) {
            return ErrorResponse("no ticket batches found", 404);
        }
        return GenericResponse(dbTicketBatches, 200);

    } catch (error: unknown) {
        console.log((error as Error).message);
        return ErrorResponse("bad request", 400);
    }
}