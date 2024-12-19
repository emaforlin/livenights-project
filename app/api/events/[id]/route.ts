import { database } from "@/db/db";
import { headers } from "next/headers";

export async function GET(request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const uid = (await params).id;

    const eventList = database;

    const foundIndex = eventList.findIndex((e) => e.uid === uid);

    if (foundIndex === -1) {
        return new Response(JSON.stringify({
            error: `event with id '${uid}' not found`
        }),{
            headers: {"Content-Type":"application/json"},
            status: 404
            }
        )
    }

    return new Response(JSON.stringify(eventList[foundIndex]), {
        headers: {"Content-Type":"application/json"},
        status: 200
    })
}

export async function DELETE(request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const uid = (await params).id;

    const eventList = database;

    const foundIndex = eventList.findIndex((e) => e.uid === uid);

    if (foundIndex === -1) {
        return new Response(JSON.stringify({
            error: `product with id '${uid}' not found`
        }),{
            headers: {"Content-Type":"application/json"},
            status: 404
            }
        )
    }

    database.splice(foundIndex, 1)

    return new Response(JSON.stringify({"deleted": uid}), {
        headers: {"Content-Type":"application/json"},
        status: 200
    })
}

export async function PUT(request: Request, { params }: 
    { params:Promise<{ id: string }> }) {
    
    try {
        const uid = (await params).id;

        const reqBody = await request.json()
        const expectedFields = ["title", "imageURL", "description", "producer", "date", "location"]
        const missingFields = expectedFields.filter(f => !(f in reqBody))
        
        if (missingFields.length > 0) {
            return new Response(JSON.stringify({
                error: "missing fields",
                missingFields
            }), {
                headers: {"Content-Type":"application/json"},
                status: 400
                } 
            );
        }

        const foundIndex = database.findIndex((e) => e.uid === uid);

        if (foundIndex === -1) {
            return new Response(JSON.stringify({
                error: `event with id '${uid}' not found`,
            }), {
                headers: {"Content-Type":"application/json"},
                status: 404
                } 
            );
        }

        reqBody.uid = uid;
        database[foundIndex] = reqBody;

        return new Response(JSON.stringify(reqBody), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error: any) {
        return new Response(JSON.stringify({
            error: "invalid JSON payload",
            details: error.message
        }), {
            headers: {"Content-Type":"application/json"},
            status: 400
        })   
    }
}