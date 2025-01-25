import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"

const S3 = new S3Client({
    region: "auto",
    endpoint: process.env.S3_API_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || "",
        secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
});

export const retrieveImages = async () => {
    const res = await S3.send(new ListObjectsV2Command({ Bucket: process.env.IMAGES_BUCKET }))
    console.log(res);

  }