import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./app/lib/db";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [GoogleProvider, CredentialsProvider({
        async authorize(credentials:  Partial<Record<string, unknown>>): Promise<User | null> {
            // if (!credentials) return null;
            const {email, password} = credentials as { email: string; password: string };
            
            const dbUser = await prisma.user.findUnique({where: {email}, include: {role: true}});

            if (!dbUser) return null

            const isCorrectPassword = await compare(password, dbUser.password!);

            if (!isCorrectPassword) return null;

            return {
                id: String(dbUser.id),
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role.name,
            };
        },
    })],
    callbacks: {
        async signIn({ user }) {
            const email = user.email!;
            const name = user.name!;

            const res = await prisma.user.upsert({
                where: { email },
                update: {},
                create: { 
                    email, name, role: {
                        connectOrCreate: {
                            create: {
                                name: "USER",
                            },
                            where: {
                                name: "USER"
                            }
                        }
                    },
                },
            });
            return res?true:false;
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
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/unauthorized"
    }
});
