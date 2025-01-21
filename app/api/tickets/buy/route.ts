import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";
import { BuyTicketProcess, PayloadOrder } from "@/app/lib/tickets";
import { ErrorParsingBody, ErrorPaymentFailure } from "../../errors";
import { z, ZodError } from "zod";

const orderPayloadSchema = z.object({
    userId: z.number().int({message: "user id must be an integer"}).gt(0),
    eventId: z.number().int({message: "event id must be an integer"}).gt(0),
    batchId: z.number().int({message: "batch id must be an integer"}).gt(0),
    quantity: z.number().int({message: "quantity must be an integer"}).gt(0),
});

export async function POST(req: NextRequest) {
    try {
        const body: PayloadOrder = await req.json();

        const payload = orderPayloadSchema.parse(body);


        if (!payload) throw ErrorParsingBody;


        const orders = await BuyTicketProcess(payload);

        return GenericResponse(orders, 200);
    
    } catch (error: any) {
        console.log(error.message);
        
        if (error instanceof ZodError) {
            const err = error.format();
            return GenericResponse(err, 400);
        }

        return ErrorResponse("something went wrong", 400)
    }
}