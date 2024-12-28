import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@prisma/client";

import bcrypt from "bcrypt";
import { prisma } from "./db/db";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z.object({ email: z.string().email().trim(), password: z.string().min(8).trim() }).safeParse(credentials);
            if (parsedCredentials.success) {

                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                
                const passwordsMatch = await bcrypt.compare(password, user.password);
                console.log("found user:", user, passwordsMatch);
                if (passwordsMatch) return user;
            }
            console.log("Invalid credentials");
            return null;
        },
    }),
    ],
});

async function getUser(email: string): Promise<User|undefined> {
    try {
        const user = await prisma.user.findUnique({where:{email: email}});
        if (!user) throw new Error("The user does not exists.");
        return user;
    } catch (error) {
        console.log("Failed to fetch user: ", error);
        throw new Error("failed to fetch user.")
    }
}