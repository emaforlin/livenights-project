import { database } from "@/db/db";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET() {
    const resp = await database;

    return new Response(JSON.stringify(resp), {
        status: 200,
        headers: {"Content-Type": "application/json"}
    })
}

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
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

        reqBody.uid = "abc"+database.length+1
        database.push(reqBody);

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