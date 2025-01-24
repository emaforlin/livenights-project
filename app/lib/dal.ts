import "server-only";

import { cache } from "react";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/db";

export const getSession = async () => {
    const session = await auth();

    return session;
}

export const getUserRole = async () => {
    const session = await auth();
    
    try {
        const dbUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email! }, 
                include: {
                    role: true,
                }
            });
         
        return dbUser?.role?.name || "GUEST";
    } catch (error) {
        console.log("failed to fetch user roles");
        return "GUEST";
    }

}