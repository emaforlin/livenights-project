import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";
import { BuyTicketProcess, PayloadOrder } from "@/app/lib/tickets";
import { ErrorParsingBody } from "../../errors";
import { z, ZodError } from "zod";
import { getUserRole } from "@/app/lib/dal";

const orderPayloadSchema = z.object({
    userId: z.number().int({message: "user id must be an integer"}).gt(0),
    eventId: z.number().int({message: "event id must be an integer"}).gt(0),
    batchId: z.number().int({message: "batch id must be an integer"}).gt(0),
    quantity: z.number().int({message: "quantity must be an integer"}).gt(0),
});

export async function POST(req: NextRequest) {
    try {
        if (req.method !== "POST") return ErrorResponse("method not allowed", 405);
        
        const role = await getUserRole();
        if (role !== "USER") return ErrorResponse("forbidden", 403);
        
        const body: PayloadOrder = await req.json();

        const payload = orderPayloadSchema.parse(body);


        if (!payload) throw ErrorParsingBody;


        const orders = await BuyTicketProcess(payload);

        return GenericResponse(orders, 200);
    
    } catch (error: unknown) {
        console.log("bad request:",error);
        
        if (error instanceof ZodError) {
            const err = error.format();
            return GenericResponse(err, 400);
        }

        return ErrorResponse("something went wrong", 400);
    }
}