import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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