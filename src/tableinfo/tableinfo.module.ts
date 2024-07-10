import { Module } from '@nestjs/common';
import { TableInfoService } from './tableinfo.service';
import { TableInfoController } from './tableinfo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        PrismaModule
    ],
    providers: [
        TableInfoService
    ],
    controllers: [TableInfoController],
    exports: [TableInfoService],
})
export class TableInfoModule {}
