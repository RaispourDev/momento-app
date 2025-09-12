import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "us-east-1", // region مهم نیست، endpoint رو override کردیم
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
  forcePathStyle: true,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { fileName, contentType, userId } = req.body;
  const key = `users/${userId}/${Date.now()}-${fileName}`;

  const cmd = new PutObjectCommand({
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
  });

  const url = await getSignedUrl(s3, cmd, { expiresIn: 60 });
  res.json({
    uploadUrl: url,
    fileUrl: `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${key}`,
  });
}
