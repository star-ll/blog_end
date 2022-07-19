import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { logger } from './logger';
import { ResponseJSON } from './response';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      // 主动抛出的异常
      response
        .status(status)
        .json(
          new ResponseJSON(null, (exception as any)?.message || '', status),
        );
    } else {
      // 服务器异常
      response.status(status).json({
        statusCode: status,
        data: null,
        message: '服务器异常，请稍后再试',
        timestamp: new Date().toISOString(),
        path: request.url,
      });

      logger.error(exception, request.url);
    }
  }
}
