import { NextRequest } from 'next/server';
import { errorMiddleware } from '@/middleware/error-middleware';
import { ErrorHandler } from '@/lib/utils/error-handler';

export async function GET(req: NextRequest) {
  return errorMiddleware(req, async () => {
    // Your API logic here
    throw ErrorHandler.createAuthError('unauthorized');
  });
}
