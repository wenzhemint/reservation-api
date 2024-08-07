import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TableInfo, Prisma } from '@prisma/client';

@Injectable()
export class TableInfoService {
  constructor(private prismaService: PrismaService) {}
  
  async getAllTableInfos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TableInfoWhereUniqueInput;
    where?: Prisma.TableInfoWhereInput;
    orderBy?: Prisma.TableInfoOrderByWithRelationInput;
  }): Promise<TableInfo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prismaService.tableInfo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getOneTableInfo(
    tableInfoWhereUniqueInput: Prisma.TableInfoWhereUniqueInput,
  ): Promise<TableInfo | null> {
    return await this.prismaService.tableInfo.findUnique({
      where: tableInfoWhereUniqueInput,
    });
  }

  async getAvailableTables(
    params: Date
  ): Promise<TableInfo[]> {
    return await this.prismaService.tableInfo.findMany({
      where: {
        NOT: {
          bookings: {
            some: {
              arrivalTime: params,
              bookingStatus: true
            }
          },
        }
      },
      include: {
        bookings: true
      }
    });
  }

  async createTableInfo(data: Prisma.TableInfoCreateInput): Promise<TableInfo> {
    return await this.prismaService.tableInfo.create({
      data,
    });
  }

  async updateTableInfo(params: {
    where: Prisma.TableInfoWhereUniqueInput;
    data: Prisma.TableInfoUpdateInput;
  }): Promise<TableInfo> {
    const { where, data } = params;
    return await this.prismaService.tableInfo.update({
      data,
      where,
    });
  }

  async deleteTableInfo(where: Prisma.TableInfoWhereUniqueInput): Promise<TableInfo> {
    return await this.prismaService.tableInfo.delete({
      where,
    });
  }
}