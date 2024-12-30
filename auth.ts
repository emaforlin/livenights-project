import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@prisma/client";

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
        async signIn( {user, profile} ) {
            console.log("User is Signing In...");
            if (!user || !user.email || !profile) return false;
            
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users?email=${user.email}`)

            let dbUser: User|null
            if (res.ok) {
                dbUser = await res.json();
            } else{
                dbUser = null
            }

            console.log("Found user in DB:", dbUser);

            if (!dbUser) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        email: user.email,
                        firstname: profile.given_name,
                        lastname: profile.family_name
                    })
                })
                if (!res.ok) return false;
                console.log("User successfully stored in DB.");
            } else {
                return true
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user && user.email) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users?email=${encodeURIComponent(user.email)}`)
                if (!res.ok) return token;

                // email stored on db
                const { id: userId, email } = await res.json();

                // checks if the user is on the db
                if (!email) return token;
        

                const res1 = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${userId}/roles`);
                if (!res1.ok) return token;
                const userRoles: string[] = await res1.json();

                token.role = userRoles.join(" ");
                return token    
            }
            return token;
        },

        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
                        
    },
});
