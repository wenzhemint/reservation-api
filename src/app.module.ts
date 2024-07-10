import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableInfoModule } from './tableinfo/tableinfo.module'

@Module({
  imports: [
    TableInfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
