"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { prisma } from "@/db/db";
import { z } from "zod";
import { User } from "@prisma/client";
import SignupForm from "../signup/components/SignupForm";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Credenciales invalidas.";
                default:
                    return "Algo no ha salido segun lo esperado.";
            }
        }
        throw error;
    }
}

export async function signup(
    prevState: string | undefined,
    formData: FormData
) {
    const signupData: SignupForm = {
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        password: formData.get("password") as string,
    };
    
    const parsedData = z.object({ 
        email: z.string({
            message: "Ingresa un email valido."
        }).email().trim(), 
        username: z.string({
            message: "Ingresa un nombre de usuario valido. (entre 4 y 16 caracteres)."
        }).min(4).max(16).trim(),
        firstname: z.string({
             message: "Ingresa un nombre valido. (maximo 40 letras)."
        }).min(2).max(40).trim(),
        lastname: z.string({
            message: "Ingresa un apellido valido. (maximo 40 letras)."
        }).min(2).max(40).trim(),
        password: z.string({
            message: "La contrasena debe tener al menos 8 caracteres."

        }).min(8).trim(),
    }).safeParse(signupData);

    
    if (parsedData.success) {
        const userData = parsedData.data;
        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        const createdUser = await createUser(userData);
        
        if (!createdUser) {
            console.log("An error occurred while creating your account.");
            return "Algo no ha salido segun lo esperado."
        }
    }
    return parsedData.error?.message;
}

async function createUser(userData: SignupForm): Promise<User | undefined> {
    const roleType = "USER";

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
            email: userData.email,
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            password: userData.password,
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

    return newUser;
}

