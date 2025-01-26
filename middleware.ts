import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const pathname = req.nextUrl.pathname
    const isOnDashboard = pathname.startsWith("/dashboard");
    const isOnSettings = pathname.startsWith("/settings");
    const isOnUserDashboard = pathname.startsWith("/user");
    const isAuthAPIRoute = pathname.startsWith("/api/auth");

    if (!token && !isAuthAPIRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const role = (token?.role as string) || "GUEST";

    if (isOnDashboard && role !== "PRODUCER") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (isOnUserDashboard && role !== "USER") {
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
        "/user/:path*",
        "/api/:path*"
    ],
};