import { prisma } from "@/db/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const requiredFields: (keyof User)[] = ["email", "firstname", "lastname"];
        const missingFields = requiredFields.filter((field) => !body[field])

        if (missingFields.length > 0) {
            return ErrorResponse("missing fields: "+missingFields, 400)
        }

        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                firstname: body.firstname,
                lastname: body.lastname,
            },
        });

        console.log("User created: ", newUser);
        return GenericResponse(newUser, 201);

    } catch (error: unknown) {
        return ErrorResponse("something went wrong :(", 400)
    }
}

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