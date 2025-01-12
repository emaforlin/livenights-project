import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import { db } from "./db/db";

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user }) {
            const email = user.email!;
            const name = user.name!;

            await db.user.upsert({
                where: { email },
                update: {},
                create: { email, name, roles: {
                    create: {
                        role: {
                            connect: { name: "USER" }
                            }
                        }
                    }
                }
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
                const dbUser = await db.user.findUnique({where: {email: user.email! }, include: {
                    roles: {
                        include: {role: true}
                    }
                }});
                
                const userRoles = dbUser?.roles
                    .map(userRole => userRole.role.name)
                    .join(" ");

                token.role = userRoles || "GUEST";

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
