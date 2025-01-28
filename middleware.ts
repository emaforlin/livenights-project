import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getUserRole } from "./app/lib/dal";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const role = token?.role??"GUEST";

    const pathname = req.nextUrl.pathname
    const isOnDashboard = pathname.startsWith("/dashboard");
    const isOnSettings = pathname.startsWith("/settings");
    const isOnUserDashboard = pathname.startsWith("/user");
    const isOnRegister = pathname.startsWith("/auth/register");
    const isOnLogin = pathname.startsWith("/auth/login");

    console.log("PATHNAME:",pathname, "Role:", role)

    if (!token && (isOnRegister || isOnLogin)) {
        return NextResponse.next();
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

    return NextResponse.next();   
}

export const config =  {
    matcher: [
        "/dashboard/:path*",
        "/settings/:path*",
        "/user/:path*",
        // "/api/:path*"
    ],
};