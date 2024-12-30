import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db/db";

export const { 
    handlers: {GET, POST},
    auth, 
    signIn, 
    signOut 
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async jwt({ token, user, profile }) {
            if (user && user.email) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users?email=${encodeURIComponent(user.email)}`)
                
                if (!res.ok) return token;

                // email stored on db
                const { email } = await res.json();
                console.log("EMAIL", email)
                // checks if the user is on the db
                if (email) {
                    const userRoles = await prisma.userRole.findMany({where: { user: { email: user.email} }});
                    const roleIds = userRoles.map(({ role_id }) =>(role_id));

                    const roles = await prisma.role.findMany({
                        where: {
                            id: {
                                in: roleIds
                            }
                        }
                    });

                    const roleTypes = roles.map(({type}) => (type));

                    token.role = roleTypes.join(" ");
                    return token    
                } else {
                    await fetch("/api/users", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            email: user.email,
                            firstname: profile?.given_name,
                            lastname: profile?.family_name,
                        })
                    })
                }
            }
            return token;
        },

        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
                        
    },
});

function CredentialsProvider(arg0: {}): import("@auth/core/providers").Provider {
    throw new Error("Function not implemented.");
}
