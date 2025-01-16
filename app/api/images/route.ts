import { getSession } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";
import { z } from "zod";

const fileSchema = z.custom<File>((file) => {
    if (!(file instanceof File)) return false;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
        throw new Error("invalid data type");
    }

    const maxSize = 1024 * 1024 * 5;
    if (file.size > maxSize) {
        throw new Error("file cannot be more than 5MB");
    }
    return true;
}, {
    message: "Archivo invalido",
});

const eventUidSchema = z.string();


export async function POST(req: NextRequest) {
    const formData = await req.formData()

    const rawFile = formData.get("file") as File;
    const eventUid = formData.get("event") as string;


    try {
        const session = await getSession();
        if (!session) {
            return ErrorResponse("unauthorized", 401)
        }

        const userId = session.user?.id;
        if (!userId) {
            return ErrorResponse("unauthorized", 401);
        }

        const producerUsername = await prisma.user.findUnique({
            where: {id: parseInt(userId)},
        })

        if (!producerUsername) {
            return ErrorResponse("producer data not found", 404);
        }

        const validImgFile = fileSchema.parse(rawFile);
        const imgBlob = await validImgFile.bytes();

        const fileExt = validImgFile.type.split("/")[1];

        const validEventUid = eventUidSchema.parse(eventUid);

        const dbImage = await prisma.image.create({
            data: {
                filename: `${producerUsername?.username}_${validEventUid!}.${fileExt}`,
                file: imgBlob,
                owner: {
                    connect: {
                        id: parseInt(userId)
                    }
                }
            }
        })
        
        return GenericResponse(JSON.stringify({
            id: dbImage.id,
            name: dbImage.filename
        }), 200)

    } catch (error: any) {
        console.log(error.message);
        return ErrorResponse(error.message, 400);
    }
    
}