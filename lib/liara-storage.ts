import { PutObjectAclCommand, S3Client } from "@aws-sdk/client-s3";

const liaraConfig = {
    endpoint: `https://${process.env.LIARA_ENDPOINT || `storage.liara.space`}`,
    region: process.env.LIARA_REGION || 'default',
    credentials: {
        accesskeyId: process.env.LIARA_ACCESS_KEY!,
        secretAccessKey: process.env.LIARA_SECRET_KEY!,
    },
    forcePathStyle: true,
};

export const s3Client = new S3Client(liaraConfig);

export async function uploadToLiara(
    bucket:string,
    key: string,
    body: Buffer,
    contentType: string
) {
    const command = new PutObjectAclCommand({
        Body: body,
        Bucket: bucket,
        Key: key,
        ContentType: contentType,
    });

    return await s3Client.send(command);
    
}