import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { TableInfoService } from './tableinfo.service';
  import { TableInfo, TableInfo as TableInfoModel } from '@prisma/client';
  
  @Controller('tableinfo')
  export class TableInfoController {
    constructor(
      private readonly tableInfoService: TableInfoService,
    ) {}

    @Get()
    async getTableInfos(): Promise<TableInfoModel[]> {
      return this.tableInfoService.tableInfos({});
    }

    @Get('/:id')
    async getOneTableInfo(
        @Param('id') id: string
    ): Promise<TableInfoModel> {
      return this.tableInfoService.tableInfo({ id: Number(id) });
    }
  
    @Post()
    async createTableInfo(
      @Body() tableInfoData: { tableNo: string; tableSize: string },
    ): Promise<TableInfoModel> {
      return this.tableInfoService.createTableInfo(tableInfoData);
    }
  
    @Put('/:id')
    async updateTableInfo(
        @Param('id') id: string,
        @Body() tableInfo: TableInfo,
    ): Promise<TableInfoModel> {
      return this.tableInfoService.updateTableInfo({
        where: { id: Number(id) },
        data: { 
            tableNo: tableInfo.tableNo,
            tableSize: tableInfo.tableSize
        },
      });
    }
  
    @Delete('/:id')
    async deleteTableInfo(@Param('id') id: string): Promise<TableInfo> {
      return this.tableInfoService.deleteTableInfo({ id: Number(id) });
    }
  }