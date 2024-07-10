import { Module } from '@nestjs/common';
import { TableInfoService } from './tableinfo.service';
import { TableInfoController } from './tableinfo.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
    imports: [],
    providers: [
        TableInfoService,
        PrismaService
    ],
    controllers: [TableInfoController],
    exports: [TableInfoService],
})
export class TableInfoModule {}
