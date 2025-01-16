import { prisma } from "@/app/lib/db";
import { ErrorResponse } from "@/utils/responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const eventCoverName = (await params).id;

    const coverImg = await prisma.image.findUnique({where: {filename: eventCoverName}});

    if (!coverImg) {
        return ErrorResponse("event cover not found", 404);
    }

    return new NextResponse(coverImg.file, {
        headers: {
            "Content-Type": coverImg.filetype,
            "Content-Length": coverImg.file.byteLength.toString(),
        }
    })
}