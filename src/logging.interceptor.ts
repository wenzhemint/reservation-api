import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler, 
  Inject, 
  HttpException 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Request } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = <Request>context.getArgByIndex(0);

    if (request.method.toUpperCase() === "HEAD") {
      return next.handle();
    }

    const url = `${request.method.toUpperCase()} ${request.originalUrl}`;
      const baseMessage = `Request Log`;
      this.logger.verbose(baseMessage, {
        message: "START",
        url: url,
        duration: Date.now() - start,
      });
    return next.handle().pipe(
      tap((data) => {
          const dataStr = JSON.stringify(data);
          if (dataStr) {
            this.logger.info(
              baseMessage,
              Object.assign(
                {
                  message: "SUCCESS",
                  url: url,
                  duration: Date.now() - start,
                  data:
                    dataStr.length > 5000 ? dataStr.substring(0, 5000) : data,
                }
              )
            );
          } else {
            this.logger.info(
              baseMessage,
              Object.assign(
                { message: "SUCCESS", url: url, duration: Date.now() - start }
              )
            );
          }
      }),
      catchError((err) => {
          this.logger.error(baseMessage, {
              message: "ERROR",
              url: url,
              status: err instanceof HttpException ? err.getStatus() : "unknown",
              error:
                err instanceof HttpException ? err.getResponse() : err.message,
              duration: Date.now() - start,
          });
          throw err;
      })
    );
  }
}