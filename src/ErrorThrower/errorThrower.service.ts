import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ClsService } from 'nestjs-cls';

export class ErrorThrower {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly clsService: ClsService
    ) {}

    throw(message: string, httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(message);
        const reqId = this.clsService.getId();
        throw new HttpException({ statusCode: httpStatus, error: message, reqId }, httpStatus);
    }
}
