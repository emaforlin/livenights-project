import "server-only";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/db";

export const getSession = async () => {
    const session = await auth();
    return session;
};

export const getUserRole = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.email) return null;
    const dbUser = await prisma.user.findUnique({
        where: {
            email: session.user.email }, 
        include: {
            role: true,
        }
    });
         
    return dbUser?.role?.name || "GUEST";
};