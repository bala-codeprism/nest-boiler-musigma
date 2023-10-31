import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class ExceptionsFilter implements ExceptionFilter {
    constructor(){}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        exception instanceof Error ? exception.message : exception.message.error;
      const statusCode = exception.status;
      const data = exception.response ? exception.response.data : null
      console.log('exception inside exception filter', message, statusCode);
      console.error(request.url, {message,userId: request.user? request.user.id: null});
      response.status(status).json({
        code: status || statusCode,
        timestamp: new Date().toISOString(),
        status: 'failed',
        message:
          status === HttpStatus.INTERNAL_SERVER_ERROR
            ? "Internal Server Error"
            : `${message}`,
        data: data ? data : null,
      });
    }
  }