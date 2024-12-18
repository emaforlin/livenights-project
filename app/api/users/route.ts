import { prisma } from "@/db/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const requiredFields: (keyof User)[] = ["email", "firstname", "lastname", "password"]
        const missingFields = requiredFields.filter((field) => !body[field])

        if (missingFields.length > 0) {
            return ErrorResponse("missing fields: "+missingFields, 400)
        }

        // check for role
        const roleType = "GUEST";
        let role = await prisma.role.findUnique({where: {type: roleType}})
        if (!role) {
            role = await prisma.role.create({
                data: {
                    type: roleType
                }
            })
        }

        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                firstname: body.firstname,
                lastname: body.lastname,
                password: body.password,         // NOT HASHED!!!
                roles: {
                    create: {
                        role: {
                            connect: {id: role.id},
                            },
                        },
                    },
                },
                include: {
                    roles: {
                        include: {role: true}
                }   
            },
        });

        console.log("User created: ", newUser);
        return GenericResponse(newUser, 201);

    } catch (error: unknown) {
        return ErrorResponse("something went wrong :(", 400)
    }
}

export async function GET() {
    const users = await prisma.user.findMany();
    console.log(users);
    return GenericResponse(users, 200);
}