import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // برای استفاده از AWS SDK در سرور
  serverExternalPackages: [
    "@aws-sdk/client-s3",
    "@aws-sdk/s3-request-presigner"
  ],

  // برای حل مشکل upload در Vercel/Liara
  experimental: {
    serverComponentsExternalPackages: ["@aws-sdk/client-s3"]
  },

  // اگر با حجم فایل‌ها مشکل دارید
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  },
}
  

export default nextConfig;