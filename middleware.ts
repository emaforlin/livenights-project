import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isOnSettings = req.nextUrl.pathname.startsWith("/settings");

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const roles = (token.role as string).split(" ");

    if (isOnDashboard && !roles.includes("PRODUCER")) {
        return NextResponse.redirect(new URL("/events", req.url));
    }

    if (!token && isOnSettings) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();   
}

export const config =  {
    matcher: [
        "/dashboard/:path*",
        "/settings/:path*"
    ],
}