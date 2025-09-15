import type { NextConfig,  } from "next";

const NextConfig: NextConfig ={
  reactStrictMode: true,

  serverExternalPackages: [
    "@aws-sdk/client-s3",
    "@aws-sdk,s3-request-presigner"
  ],
};

export default NextConfig