import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types';

export function json<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data }, { status });
}

export function error(message: string, status = 400) {
  return NextResponse.json<ApiResponse<never>>(
    { success: false, error: message },
    { status }
  );
}

export function notFound(message = 'Resource not found') {
  return error(message, 404);
}

export function unauthorized(message = 'Unauthorized') {
  return error(message, 401);
}

export function forbidden(message = 'Forbidden') {
  return error(message, 403);
}

export function serverError(message = 'Internal server error') {
  return error(message, 500);
}
