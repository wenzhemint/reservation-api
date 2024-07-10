import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from "@nestjs/config";
import { ClsService, ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableInfoModule } from './tableinfo/tableinfo.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { randomUUID } from 'node:crypto';
import { ErrorThrowerModule } from "./ErrorThrower/errorThrower.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { 
        mount: true,
        generateId: true,
        idGenerator: () => randomUUID(),
      },
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService, clsService: ClsService) => ({
        transports: [
          new winston.transports.Console({
            level: configService.get("LOG_LEVEL") || "info",
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format((info) => {
                info.reqId = clsService.getId();
                return info;
              })(),
              winston.format.json()
            ),
          }),
        ],
      }),
      inject: [ConfigService, ClsService],
    }),
    TableInfoModule,
    ErrorThrowerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
