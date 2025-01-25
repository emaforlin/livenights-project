import { getSession } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { retrieveImages } from "@/app/lib/s3";
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

const stringSchema = z.string();


export async function POST(req: NextRequest) {
    const formData = await req.formData()

    const rawFile = formData.get("file") as File;
    const rawFileName = formData.get("filename") as string;

    try {
        const session = await getSession();
        if (!session) {
            return ErrorResponse("unauthorized", 401)
        }

        const userId = session.user?.id;
        if (!userId) {
            return ErrorResponse("unauthorized", 401);
        }

        const producer = await prisma.user.findUnique({
            where: {id: parseInt(userId)},
        })

        if (!producer) {
            return ErrorResponse("producer data not found", 404);
        }

        const validImgFile = fileSchema.parse(rawFile);
        const imgBlob = await validImgFile.bytes();

        const validFilename = stringSchema.parse(rawFileName);

        const dbImage = await prisma.image.create({
            data: {
                file: imgBlob,
                filetype: validImgFile.type,
                filename: `${producer?.username}_${validFilename!}`,
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

export async function GET(req: NextRequest) {
    retrieveImages();
}