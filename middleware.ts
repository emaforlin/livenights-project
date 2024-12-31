import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"]
}

export async function middleware(req: NextRequest) {
    const accessRules : { [path: string]: string[] } = {
        "/dashboard": ["PRODUCER", "USER"],
        "/events": ["GUEST"],
    };
    
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const currentPath = req.nextUrl.pathname;
    const requiredRole = accessRules[currentPath];

    if (!requiredRole) console.log(`No access rule found for ${currentPath}. Please check the AccessRules and add at least one if it's needed.`)

    const userRoles = token?.role ? String(token.role) : "GUEST"; // Asegurarse de que sea cadena
    requiredRole?console.log("required roles: ", requiredRole):console.log();
    console.log("user roles: ", userRoles);

    if (
        requiredRole &&
        typeof userRoles === "string" &&
        !userRoles.split(" ").some(rule => requiredRole.includes(rule))
    ) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}