import { ErrorResponse, MessageResponse } from "@/utils/genericResponses";
import { PrismaClient, Prisma, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({})

export async function POST(req: NextRequest) {
    try {
        const body: ProducerSignupData = await req.json();

        const requiredFields: (keyof ProducerSignupData)[] = ["email", "firstname", "lastname", "password", "companyName"]
        const missingFields = requiredFields.filter((field) => !body[field])

        if (missingFields.length > 0) {
            return ErrorResponse("missing fields: "+missingFields, 400)
        }

        console.log(body);
        
        // check for role
        const roleType = "producer";
        const role = await prisma.role.upsert({
            where: {type: roleType},
            update: {},
            create: {type: roleType}
        })

        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                firstname: body.firstname,
                lastname: body.lastname,
                password: body.password,    // NOT HASHED!!!
                roles: {
                    create: {
                        role: {
                            connect: {id: role.id}
                        }
                    }
                },
                Producer: {
                    create: {
                        name: body.companyName,
                    },
                },
            },
            include: {
                roles: true,
                Producer: true,
            }
        });

        console.log("User created: ", newUser);
        return MessageResponse("user created successfully", newUser, 201)

    } catch (error) {
        return ErrorResponse("something went wrong :(", 400)
    }
}