import { getUserRole } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    if (req.method !== "GET") 
        return ErrorResponse("method not allowed", 405);
            
    const role = await getUserRole()??"";
    
    if (role !== "PRODUCER")
        return ErrorResponse("forbidden", 403);

    const userEmail = req.nextUrl.searchParams.get("email");
    if (userEmail) {
        const user = await prisma.user.findUnique({where: {email: userEmail}});
        if (!user) {
            return ErrorResponse("user not found", 404);
        }
        return GenericResponse(user, 200);
    }
    const users = await prisma.user.findMany();
    return GenericResponse(users, 200);
}