import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// export default NextAuth(authConfig).auth;

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)",]
}

export async function middleware(req: NextRequest) {
    const protectedRoutes : { [path: string]: string[] } = {
        "/dashboard": ["PRODUCER", "USER"],
        "/path": ["ROLE"]
    };
    
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (token) {
        const currentPath = req.nextUrl.pathname;
    
        const requiredRole = protectedRoutes[currentPath];
    
        const userRoles = (token.role as string).split(" ");
    
        requiredRole?console.log("path:", currentPath, "has:", userRoles, "requires:", requiredRole):console.log();
    
        if (requiredRole && !userRoles.some(rule => requiredRole.includes(rule))) {
            return NextResponse.redirect(new URL("/", req.url))
        }
        return NextResponse.next();
    }
    return NextResponse.next();
}