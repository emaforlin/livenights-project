import { error } from "console";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export function ErrorResponse(errorMsg: string, code: number): NextResponse {
    return new NextResponse(JSON.stringify({error: errorMsg}),
    {
        status: code,
        headers: {"Content-Type": "application/json"}
    })
}

export function GenericResponse(body: any, code: number): NextResponse {
    return new NextResponse(JSON.stringify(body),
    {
        status: code,
        headers: {"Content-Type": "application/json"}
    })
}
