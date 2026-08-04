import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let buffer: Buffer | null = null;
    let folder = 'um_digital/assets';
    let originalFilename = 'uploaded-image.png';

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

      originalFilename = file.name || 'image.png';
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

    // Try Cloudinary upload first if configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      try {
        const result = await uploadToCloudinary(buffer, folder);
        return NextResponse.json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
        });
      } catch (cloudErr) {
        console.warn('Cloudinary upload failed, falling back to local storage:', cloudErr);
      }
    }

    // Local file storage fallback into public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeName = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);
    const localUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: localUrl,
      isLocal: true,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error uploading file';
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

