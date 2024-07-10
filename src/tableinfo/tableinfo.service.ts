import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TableInfo, Prisma } from '@prisma/client';

@Injectable()
export class TableInfoService {
  constructor(private prismaService: PrismaService) {}

  async tableInfo(
    tableInfoWhereUniqueInput: Prisma.TableInfoWhereUniqueInput,
  ): Promise<TableInfo | null> {
    return this.prismaService.tableInfo.findUnique({
      where: tableInfoWhereUniqueInput,
    });
  }

  async tableInfos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TableInfoWhereUniqueInput;
    where?: Prisma.TableInfoWhereInput;
    orderBy?: Prisma.TableInfoOrderByWithRelationInput;
  }): Promise<TableInfo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.tableInfo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTableInfo(data: Prisma.TableInfoCreateInput): Promise<TableInfo> {
    return this.prismaService.tableInfo.create({
      data,
    });
  }

  async updateTableInfo(params: {
    where: Prisma.TableInfoWhereUniqueInput;
    data: Prisma.TableInfoUpdateInput;
  }): Promise<TableInfo> {
    const { where, data } = params;
    return this.prismaService.tableInfo.update({
      data,
      where,
    });
  }

  async deleteTableInfo(where: Prisma.TableInfoWhereUniqueInput): Promise<TableInfo> {
    return this.prismaService.tableInfo.delete({
      where,
    });
  }
}