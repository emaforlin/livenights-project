import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { hash } from "bcrypt";
import { NextRequest } from "next/server";
import { z } from "zod";

const userRegisterSchema = z.object({
    email: z
        .string({required_error: "field required"})
        .email({message: "invalid email"})
        .trim(),
    name: z
        .string({required_error: "field required"})
        .min(2, {message: "name too short"})
        .max(70, {message: "name too long"})
        .trim(),
    username: z
        .string({required_error: "field required"})
        .min(4, {message: "username too short"})
        .max(32, {message: "username too long"})
        .trim(),
    password: z
        .string({required_error: "field required"})
        .min(8, {message: "password must be at least 8 characters"})
        .max(70, {message: "password cannot be longer than 70 characters"})
        .trim(),
});

export async function POST(req: NextRequest) {
    try {
        if (req.method !== "POST") return ErrorResponse("method not allowed", 405);
        // const session = await getSession();
        // if (!session) return ErrorResponse("unauthorized", 401);
        
        const body = await req.json();
        const newUser = userRegisterSchema.parse(body);
        
        const userExists = await prisma.user.findFirst({where: { email: newUser.email }});
        if (userExists) return ErrorResponse("This email already has an account associated", 400);

        const createdUser = await prisma.user.create({data: {
            email: newUser.email,
            name: newUser.name,
            username: newUser.username,
            password: await hash(newUser.password, 10),
            role: {
                connectOrCreate: {
                    create: {
                        name: "USER",
                    },
                    where: {
                        name: "USER"
                    }
                }
            }
        }});

        if (!createdUser) throw new Error("failed to insert user data into db");

        return GenericResponse("User created", 201);

    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return GenericResponse(error.errors, 400);
        } 
        return ErrorResponse("could not created user account", 400);
        
    }
}