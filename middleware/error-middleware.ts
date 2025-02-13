import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ErrorHandler } from '@/lib/utils/error-handler';
import { ApiError } from '@/lib/types/errors';

export async function errorMiddleware(request: NextRequest, handler: () => Promise<Response>) {
  try {
    return await handler();
  } catch (error) {
    console.error('API Error:', error);

    const apiError = ErrorHandler.isApiError(error)
      ? (error as ApiError)
      : ErrorHandler.handleApiError(error);

    return NextResponse.json(
      {
        error: {
          message: apiError.message,
          code: apiError.code,
          details: apiError.details,
        },
      },
      { status: apiError.statusCode }
    );
  }
}
