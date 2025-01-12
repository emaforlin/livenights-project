import "server-only";

import {getToken} from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";
import { auth } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
import { env } from "process";
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
        const dbUser = await db.user.findUnique({where: {email: session.user.email! }, include: {
            roles: {
                include: {role: true}
                    }
                }});
         
        const userRoles = dbUser?.roles.map(userRole => userRole.role.name);

        return userRoles || [""];
    } catch (error) {
        console.log("failed to fetch user roles");
        return [];
    }

})