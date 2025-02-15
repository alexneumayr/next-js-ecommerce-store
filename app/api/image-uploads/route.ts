import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export type ImageUploadResponsePost =
  | {
      imageUrl: string;
    }
  | {
      error: string;
    };

type CloudinaryResponse = {
  secure_url: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ImageUploadResponsePost>> {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file.name) {
      return NextResponse.json({ error: 'Please select an image' });
    }

    if (file.size > 1024 * 1024 * 5) {
      return NextResponse.json({ error: 'Image is too large' });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const response = await new Promise<CloudinaryResponse | undefined>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          })
          .end(buffer);
      },
    );

    if (!response) {
      return NextResponse.json({ error: 'Image upload failed' });
    }

    console.log('Image url', response.secure_url);
    return NextResponse.json({ imageUrl: response.secure_url });
  } catch (error) {
    return NextResponse.json({
      error: (error as Error).message,
    });
  }
}
