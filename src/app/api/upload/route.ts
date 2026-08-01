import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let buffer: Buffer | null = null;
    let folder = 'um_digital/assets';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      const customFolder = formData.get('folder') as string | null;

      if (!file) {
        return NextResponse.json({ error: 'No image file provided in form data' }, { status: 400 });
      }

      if (customFolder) {
        folder = customFolder;
      }

      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      const body = await request.json();
      const { file, folder: customFolder } = body;

      if (!file) {
        return NextResponse.json({ error: 'No base64 image data provided' }, { status: 400 });
      }

      if (customFolder) {
        folder = customFolder;
      }

      // Handle base64 string
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
    }

    if (!buffer) {
      return NextResponse.json({ error: 'Failed to process image buffer' }, { status: 400 });
    }

    // Check if Cloudinary environment variables are set
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json(
        {
          error:
            'Cloudinary credentials are not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
        },
        { status: 500 }
      );
    }

    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error uploading file to Cloudinary' },
      { status: 500 }
    );
  }
}
