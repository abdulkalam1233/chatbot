import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import z, { ZodError } from "zod";
import { ApiResponseFactory } from "../api-response-factory";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly apiResponseFactory: ApiResponseFactory
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let responseDto = this.apiResponseFactory.toErrorDto(exception);
    if (exception instanceof ZodError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      responseDto = this.apiResponseFactory.toErrorDto(z.treeifyError(exception));
    }
    httpAdapter.reply(ctx.getResponse(), responseDto, httpStatus);
  }
}
