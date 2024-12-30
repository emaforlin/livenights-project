import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// export default NextAuth(authConfig).auth;

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"]
}

export async function middleware(req: NextRequest) {
    const protectedRoutes : { [path: string]: string[] } = {
        "/dashboard": ["PRODUCER", "USER"],
        "/path": ["ROLE"]
    };
    
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const currentPath = req.nextUrl.pathname;
    const requiredRole = protectedRoutes[currentPath];
    
    const userRoles = token?(token.role as string):"GUEST";
    console.log("path: ", currentPath);
    console.log("required roles: ", requiredRole);
    console.log("user roles: ", userRoles);
    
        
    if (requiredRole && userRoles && !userRoles.split(" ").some(rule => requiredRole.includes(rule))) {
        return NextResponse.redirect(new URL("/", req.url))
    }
    
    return NextResponse.next();
}