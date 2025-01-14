import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import { prisma } from "./app/lib/db";

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user }) {
            const email = user.email!;
            const name = user.name!;

            await prisma.user.upsert({
                where: { email },
                update: {},
                create: { 
                    email, name, role: {
                    connect: {name: "USER"},
                    },
                },
            });
            return true;
        },

        async session({ session, token }) {
            if (token?.role) {
                session.user.role = token.role;
                session.user.id = token.userId as string;
            }
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: {email: user.email! }, 
                    include: {
                        role: true
                    }
                });
                
        
                token.role = dbUser?.role.name || "GUEST";

                token.userId = dbUser?.id;
            }
            return token;
        }
    },
    secret: process.env.AUTH_SECRET!,
    session: {
        strategy: "jwt",
    },
});
