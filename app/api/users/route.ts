import { ErrorResponse, MessageResponse } from "@/utils/genericResponses";
import { PrismaClient, Prisma, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({})

export async function POST(req: NextRequest) {
    try {
        const body: UserSignupData = await req.json();

        const requiredFields: (keyof UserSignupData)[] = ["email", "firstname", "lastname", "password"]
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
        return MessageResponse("user created successfully", newUser, 201)

    } catch (error: unknown) {
        return ErrorResponse("something went wrong :(", 400)
    }
}