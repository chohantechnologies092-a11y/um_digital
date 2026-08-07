import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

const cached: MongooseCache = global.mongooseCache;

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const mongodbUri = process.env.MONGODB_URI;
  if (
    !mongodbUri ||
    mongodbUri.includes('<db_password>') ||
    mongodbUri.includes('<password>') ||
    mongodbUri.includes('<username>') ||
    mongodbUri.includes('YOUR_') ||
    mongodbUri.includes('[password]')
  ) {
    console.warn('connectToDatabase: MONGODB_URI is not set or contains placeholder credentials.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(mongodbUri, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        console.warn('Error connecting to MongoDB Atlas:', err.message || err);
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.warn('Error awaiting MongoDB connection:', e);
    return null;
  }

  return cached.conn;
}
