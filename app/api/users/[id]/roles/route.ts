import { prisma } from "@/db/db";
import { GenericResponse } from "@/utils/responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const userId = (await params).id;

    const userRoles = await prisma.userRole.findMany({where: { user: { id: parseInt(userId)} }});

    const roleIds = userRoles.map(({ role_id }) =>(role_id));

    const roles = await prisma.role.findMany({
        where: {
            id: {
                in: roleIds
                    }
                }
            });

    const roleTypes = roles.map(({type}) => (type));
    

    return GenericResponse(roleTypes, 200)
}