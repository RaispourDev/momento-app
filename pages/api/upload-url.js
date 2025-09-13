import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: "fileName and fileType are required" });
    }

    // ساخت کلاینت برای لیارا
    const s3 = new S3Client({
      region: "us-east-1", // مهم نیست
      endpoint: `https://${process.env.LIARA_ENDPOINT}`, // مثلا s3.ir-thr-at1.liara.space
      credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY,
      },
      forcePathStyle: true,
    });

    // گرفتن لینک presigned
    const presignedPost = await createPresignedPost(s3, {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: fileName,
      Conditions: [
        ["content-length-range", 0, 10485760], // حداکثر ۱۰MB
        ["starts-with", "$Content-Type", ""],
      ],
      Fields: {
        "Content-Type": fileType,
      },
      Expires: 60, // اعتبار یک دقیقه
    });

    res.status(200).json(presignedPost);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "مشکلی در گرفتن لینک آپلود رخ داد" });
  }
}
