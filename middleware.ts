import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const roles = (token.role as string).split(" ");
    console.log("DEBUG: Roles: ", roles);

    if (isOnDashboard && !roles.includes("PRODUCER")) {
        return NextResponse.redirect(new URL("/events", req.url));
    }

    return NextResponse.next();   
}

export const config =  {
    matcher: ["/dashboard/:path*"],
}