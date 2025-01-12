import "server-only";

import { cache } from "react";
import { auth } from "@/auth";
import { db } from "@/db/db";

export const getSession = cache(async () => {
    const session = await auth();

    return session;
})

export const getUserRoles = cache(async () => {
    const session = await auth();
    
    if (!session) {
        return [];
    }

    try {
        const dbUser = await db.user.findUnique({
            where: {
                email: session?.user?.email! }, 
                include: {
                    role: true,
                }
            });
         
        return dbUser?.role.name
    } catch (error) {
        console.log("failed to fetch user roles");
        return [];
    }

})