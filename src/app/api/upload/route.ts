import { NextRequest, NextResponse } from "next/server";
import { uploadToLiara } from "../../../../lib/liara-storage";

const ALLOWED_MIME_TYPES =[
  'image/jpg',
  'image/png',
];

export async function POST(request:NextRequest) {
  try{
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('upload request to liara');
    console.log('file name:', file?.name);
    console.log('file size:', file?.size, 'bytes');
    console.log('file type:', file?.type);

    if (!file){
      return NextResponse.json(
        {
          success: false,
          error: 'no file is sent'
        },
        {status: 400}
      );
    }

    if(!ALLOWED_MIME_TYPES.includes(file.type)){
      return NextResponse.json(
        {
          success: false,
          error: 'no valid file type'
        },
        {status: 400}
      );
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if(file.size > MAX_FILE_SIZE){
      return NextResponse.json(
        {
          success: false,
          error: 'file is more than 10mb'
        },
        {status: 400}
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `upload/${timestamp}-${randomString}-${fileExtension}`;

    console.log('uploading to liara')

    try{
      await uploadToLiara(
        process.env.LIARA_BUCKET_NAME!,
        fileName,
        buffer,
        file.type
      );
    } catch (uploadError){
      console.error('error in upload to liara', uploadError);
      throw new Error("liara connection broke");
    }

    console.log('upload to liara was successful')

    const fileUrl = `https://${process.env.LIARA_BUCKET_NAME}.${process.env.LIARA_ENDPOINT || `storage.liara.space`}/${fileName}`;

    return NextResponse.json(
      {
        success: true,
        message: 'success upload',
        data: {
          url: fileUrl,
          originalName: file.name,
          filename: fileName,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString()
        }
      },
      {status: 200}
    );
  
  } catch (error) {
    console.error('error in processing your request', error)

    const errorMessage = error instanceof Error
    ?error.message
    : 'unknown error in server';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage
      },
      {status: 500}
    );
  }
}