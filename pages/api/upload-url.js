import { S3Client, CreatePresignedPostCommand } from "@aws-sdk/s3-presigned-post";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: "fileName and fileType are required" });
    }

    // کلاینت S3 برای لیارا
    const s3 = new S3Client({
      region: "us-east-1", // مهم نیست، چون endpoint رو override می‌کنیم
      endpoint: `https://${process.env.LIARA_ENDPOINT}`, // مثلا: s3.ir-thr-at1.liara.space
      credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY,
      },
      forcePathStyle: true,
    });

    // ساختن presigned POST
    const command = new CreatePresignedPostCommand({
      Bucket: process.env.LIARA_BUCKET_NAME, // مثلا: momento-bk
      Key: fileName,
      Conditions: [
        ["content-length-range", 0, 10485760], // محدودیت حجم (10MB)
        ["starts-with", "$Content-Type", ""],
      ],
      Fields: {
        "Content-Type": fileType,
      },
      Expires: 60, // یک دقیقه اعتبار لینک
    });

    const presignedPost = await s3.send(command);

    res.status(200).json(presignedPost);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "مشکلی در گرفتن لینک آپلود رخ داد" });
  }
}
