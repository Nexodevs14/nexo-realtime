import { ApiErrorDetail } from "@/types/http.types";

/**
 * Base application error.
 *
 * All controlled application errors must extend this class.
 */
export abstract class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: ApiErrorDetail[];

  protected constructor(
    message: string,
    statusCode: number,
    errors: ApiErrorDetail[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}


/**
 * Validation error (400)
 */
export class ValidationError extends AppError {
  constructor(errors: ApiErrorDetail[]) {
    super(
      "Invalid request payload",
      400,
      errors
    );
  }
}

/**
 * Unauthorized error (401)
 */
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

/**
 * Resource not found error (404)
 */
export class NotFoundError extends AppError {
  constructor(message = "Route not found") {
    super(message, 404);
  }
}

/**
 * Unexpected error (500)
 */
export class UnexpectedError extends AppError {
  constructor(message = "Unexpected error") {
    super(message, 500);
  }
}