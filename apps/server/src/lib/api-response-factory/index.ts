import { Global, Injectable } from "@nestjs/common";
import type { ApiResponse } from "@repo/shared";

@Injectable()
@Global()
export class ApiResponseFactory {
  toDto<T = unknown>(data: T): ApiResponse<T> {
    return { data };
  }

  toErrorDto(error: unknown): ApiResponse<null> {
    return { data: null, error };
  }
}
