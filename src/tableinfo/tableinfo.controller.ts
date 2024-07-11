import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { TableInfoService } from './tableinfo.service';
import { TableInfo, Prisma } from '@prisma/client';
import { TableInfoBodyDto, getAllAvailableTablesDto } from './tableinfo.dto';
import { ErrorThrower } from "../ErrorThrower/errorThrower.service";

@Controller('tableinfo')
export class TableInfoController {
  constructor(
    private readonly tableInfoService: TableInfoService,
    private readonly errorThrower: ErrorThrower
  ) {}

  @Get()
  async getTableInfos(): Promise<TableInfo[]> {
    try {
      return await this.tableInfoService.getAllTableInfos({});
    } catch (e) {
      this.errorThrower.throw(e.message);
    }
  }

  @Get('info/:id')
  async getOneTableInfo(
      @Param('id') id: string
  ) {
    try {
      const tableinfo = await this.tableInfoService.getOneTableInfo({ id: Number(id) });
      console.log("== tableinfo: ", tableinfo);
      if(!tableinfo) {
        return {};
      }
      return tableinfo;
    } catch (e) {
      this.errorThrower.throw(e.message);
    }
  }

  @Get('available')
  async getAllAvailableTables(
    @Query() query: getAllAvailableTablesDto,
  ) {
    const { arrivalTime } = query;
    const datetimeConverted = new Date(arrivalTime);
    if(datetimeConverted.toString() == 'Invalid Date') {
      this.errorThrower.throw("Invalid Date Value", 400);
    }

    try {
      const tablesToFilter = await this.tableInfoService.getAvailableTables(datetimeConverted);
      return await this.tableInfoService.getAvailableTables(datetimeConverted);
    } catch (e) {
      this.errorThrower.throw(e.message);
    }
  }

  @Post()
  async createTableInfo(
    @Body(new ValidationPipe({ transform: true })) 
    body: TableInfoBodyDto,
  ): Promise<TableInfo> {
    const tableinfo = await this.tableInfoService.getOneTableInfo({ id: Number(body.tableNo) });
    console.log("== tableinfo: ", tableinfo);
    if(tableinfo != null) {
      this.errorThrower.throw("The 'tableNo' is already exist.", 400);
    }

    try {
      return await this.tableInfoService.createTableInfo(body);
    } catch (e) {
      this.errorThrower.throw(e.message);
    }
  }

  @Put(':id')
  async updateTableInfo(
      @Param('id') id: string,
      @Body() tableInfo: TableInfo,
  ): Promise<TableInfo> {
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

  @Delete(':id')
  async deleteTableInfo(@Param('id') id: string): Promise<TableInfo> {
    try {
      return await this.tableInfoService.deleteTableInfo({ id: Number(id) });
    } catch (e) {
      this.errorThrower.throw(e.message);
    }
  }
}