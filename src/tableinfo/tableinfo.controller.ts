import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ValidationPipe
  } from '@nestjs/common';
  import { TableInfoService } from './tableinfo.service';
  import { TableInfo, TableInfo as TableInfoModel } from '@prisma/client';
  import { TableInfoBodyDto } from './tableinfo.dto';
  import { ErrorThrower } from "../ErrorThrower/errorThrower.service";
  
  @Controller('tableinfo')
  export class TableInfoController {
    constructor(
      private readonly tableInfoService: TableInfoService,
      private readonly errorThrower: ErrorThrower
    ) {}

    @Get()
    async getTableInfos(): Promise<TableInfoModel[]> {
      try {
        return this.tableInfoService.tableInfos({});
      } catch (e) {
        this.errorThrower.throw(e.message);
      }
    }

    @Get('/:id')
    async getOneTableInfo(
        @Param('id') id: string
    ) {
      try {
        const tableinfo = await this.tableInfoService.tableInfo({ id: Number(id) });
        console.log("== tableinfo: ", tableinfo);
        if(!tableinfo) {
          return {};
        }
        return tableinfo;
      } catch (e) {
        this.errorThrower.throw(e.message);
      }
    }
  
    @Post()
    async createTableInfo(
      @Body(new ValidationPipe({ transform: true })) 
      body: TableInfoBodyDto,
    ): Promise<TableInfoModel> {
      try {
        return await this.tableInfoService.createTableInfo(body);
      } catch (e) {
        this.errorThrower.throw(e.message);
      }
    }
  
    @Put('/:id')
    async updateTableInfo(
        @Param('id') id: string,
        @Body() tableInfo: TableInfo,
    ): Promise<TableInfoModel> {
      try {
        return await this.tableInfoService.updateTableInfo({
          where: { id: Number(id) },
          data: { 
              tableNo: tableInfo.tableNo,
              tableSize: tableInfo.tableSize
          },
        });
      } catch (e) {
        this.errorThrower.throw(e.message);
      }
    }
  
    @Delete('/:id')
    async deleteTableInfo(@Param('id') id: string): Promise<TableInfo> {
      try {
        return await this.tableInfoService.deleteTableInfo({ id: Number(id) });
      } catch (e) {
        this.errorThrower.throw(e.message);
      }
    }
  }