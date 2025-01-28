import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getUserRole } from "./app/lib/dal";

export async function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.startsWith('/static') ||
        req.nextUrl.pathname.startsWith('/favicon.ico')
    ) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    // const role = await getUserRole()??"GUEST";
    const role = token?.role;

    const pathname = req.nextUrl.pathname
    const isOnRoot = pathname === "/"
    const isOnAuth = pathname.startsWith("/auth")
    const isOnDashboard = pathname.startsWith("/dashboard");
    const isOnSettings = pathname.startsWith("/settings");
    const isOnUserDashboard = pathname.startsWith("/user");
    // const isAuthAPIRoute = pathname.startsWith("/api/auth");


    if (!token && (isOnRoot || isOnAuth)) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (isOnDashboard && role !== "PRODUCER") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (isOnUserDashboard && role !== "USER") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && isOnSettings) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    console.log(role, req.nextUrl.pathname);
    return NextResponse.next();   
}

export const config =  {
    matcher: [
        "/auth/:path*",
        "/dashboard/:path*",
        "/user/:path*",
        "/settings/:path*",
    ],
};