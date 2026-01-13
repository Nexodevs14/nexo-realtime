import { Response } from "express";

/**
 * Standard successful API response.
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  code: number;
  data: T;
  errors: [];
}

/**
 * Generic error object structure returned by the backend.
 */
export interface ApiErrorDetail {
  field?: string;
  message: string;
  [key: string]: unknown;
}

/**
 * Standard error API response.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  code: number;
  errors: ApiErrorDetail[];
}

/**
 * Union type representing any possible API response.
 * Useful for response type narrowing.
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Type definition for API error representation.
 */
export type ApiError = {
  message: string;
  status?: number;
  data?: any;
};

/**
 * Helper function to send a successful API response.
 */
export function ok<T>(
  res: Response,
  data: T,
  message = "OK",
  code = 200
): Response<ApiSuccessResponse<T>> {
  return res.status(code).json({
    success: true,
    message,
    code,
    data,
    errors: [],
  });
}

/**
 * Helper function to send an error API response.
 */
export function error(
  res: Response,
  message: string,
  code = 400,
  errors: ApiErrorDetail[] = []
): Response<ApiErrorResponse> {
  return res.status(code).json({
    success: false,
    message,
    code,
    errors,
  });
}