import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Booking, Prisma } from '@prisma/client';

@Injectable()
export class BookingService {
    constructor(private prismaService: PrismaService) {}

    async getAllBookings(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.BookingWhereUniqueInput;
        where?: Prisma.BookingWhereInput;
        orderBy?: Prisma.BookingOrderByWithRelationInput;
    }): Promise<Booking[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prismaService.booking.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async getOneBooking(
        bookingWhereUniqueInput: Prisma.BookingWhereUniqueInput,
    ): Promise<Booking | null> {
        return this.prismaService.booking.findUnique({
            where: bookingWhereUniqueInput,
        });
    }

    async createBooking(data: Prisma.BookingCreateInput): Promise<Booking> {
        return this.prismaService.booking.create({
            data,
        });
    }

    async updateBooking(params: {
        where: Prisma.BookingWhereUniqueInput;
        data: Prisma.BookingUpdateInput;
    }): Promise<Booking> {
        const { where, data } = params;
        return this.prismaService.booking.update({
            data,
            where,
        });
    }

    async deleteBooking(where: Prisma.BookingWhereUniqueInput): Promise<Booking> {
        return this.prismaService.booking.delete({
            where,
        });
    }
}