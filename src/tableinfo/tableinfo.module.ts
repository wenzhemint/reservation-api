import { Module } from '@nestjs/common';
import { TableInfoService } from './tableinfo.service';
import { TableInfoController } from './tableinfo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ErrorThrowerModule } from 'src/ErrorThrower/errorThrower.module';

@Module({
    imports: [
        PrismaModule,
        ErrorThrowerModule
    ],
    providers: [
        TableInfoService
    ],
    controllers: [TableInfoController],
    exports: [TableInfoService],
})
export class TableInfoModule {}
