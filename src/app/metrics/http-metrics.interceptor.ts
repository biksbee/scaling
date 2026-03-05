import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap(() => {
        const duration = Number(process.hrtime.bigint() - start)
        this.metricsService.httpDuration.observe(
          {
            method: request.method,
            route: request.route?.path || 'unknown',
            status: 200
          },
          duration,
        );
      }),
    );
  }
}