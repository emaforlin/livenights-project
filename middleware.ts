import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isOnSettings = req.nextUrl.pathname.startsWith("/settings");
    const isOnUserDashboard = req.nextUrl.pathname.startsWith("/user");


    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const roles = (token.role as string).split(" ");
    console.log("Roles:", roles);

    if (isOnDashboard && !roles.includes("PRODUCER")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (isOnUserDashboard && !roles.includes("USER")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && isOnSettings) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();   
}

export const config =  {
    matcher: [
        "/dashboard/:path*",
        "/settings/:path*",
        "/user/:path*"
    ],
}