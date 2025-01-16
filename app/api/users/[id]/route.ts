import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    const userId = (await params).id;

    const user = await prisma.user.findUnique({
        where: {id: parseInt(userId) },
    });

    if (!user) {
        return ErrorResponse(`user not found`, 404)
    }

    return GenericResponse(user, 200);
}

export async function PATCH(req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
){
    try {
        const userId = (await params).id;

        const reqBody = await req.json()
        const expectedFields: string[] = ["role", "username"]
        const missingFields = expectedFields.filter(f => !(f in reqBody))
                
        if (missingFields.length > 0) {
            console.log(`error missing fields: ${missingFields}`);
            return ErrorResponse(`error missing fields: ${missingFields}`, 400);
        }

        const updatedUser = await prisma.user.update({
            where: {id: parseInt(userId)},
            data: {
                username: reqBody.username,
                role: {
                    connect: {
                        name: reqBody.role
                    }
                }
            }

        })
        return GenericResponse(updatedUser, 200);
                
    } catch (error) {
        console.log(error);
        return ErrorResponse("couldn't updated user", 400);
    }
        

}