import { getSession } from "@/app/lib/dal";
import { prisma } from "@/app/lib/db";
import { ErrorResponse, GenericResponse } from "@/utils/responses";
import { NextRequest } from "next/server";
import { z } from "zod";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_KEY_ID!,
    },
});

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
    message: "Invalid file",
});

const stringSchema = z.string();


export async function POST(req: NextRequest) { 
    try {
        const formData = await req.formData();
    
        const rawFile = formData.get("file") as File;
        const rawFileName = formData.get("filename") as string;

        const session = await getSession();
        if (!session) {
            return ErrorResponse("unauthorized", 401);
        }

        const userId = session.user?.id;
        if (!userId) {
            return ErrorResponse("unauthorized", 401);
        }

        const producer = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
                AND: {
                    role: {
                        name: "PRODUCER"
                    }
                }
            },
        });

        if (!producer) {
            return ErrorResponse("producer data not found", 404);
        }

        const validImgFile = fileSchema.parse(rawFile);
        const imgBuffer = Buffer.from(await validImgFile.arrayBuffer());
        const validFilename = stringSchema.parse(rawFileName);
        const uniqueFilename = `${producer.username}_${crypto.randomUUID()}_${validFilename}`;

        const uploadParams = {
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: uniqueFilename,
            Body: imgBuffer,
            ContentType: validImgFile.type
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const fileUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({ 
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: uniqueFilename,
            }),
            { expiresIn: 7*24*3600}
        );
        
        return GenericResponse(JSON.stringify(fileUrl.replaceAll('"',"")), 200);

    } catch (error: unknown) {
        console.log((error as Error).message);
        return ErrorResponse("bad request", 400);
    }
    
}