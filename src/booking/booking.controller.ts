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
import { BookingService } from './booking.service';
import { Booking, Prisma } from '@prisma/client';
import { BookingBodyDto } from './booking.dto';
import { ErrorThrower } from "../ErrorThrower/errorThrower.service";
  
@Controller('booking')
export class BookingController {
    constructor(
      private readonly bookingService: BookingService,
      private readonly errorThrower: ErrorThrower
    ) {}
  
    @Get()
    async getBookings(): Promise<Booking[]> {
      try {
        return this.bookingService.getAllBookings({});
      } catch (e) {
        this.errorThrower.throw(e.message);
      }
    }
  
    @Get(':id')
    async getOneBooking(
        @Param('id') id: string
    ) {
      try {
        const booking = await this.bookingService.getOneBooking({ id: Number(id) });
        console.log("== booking: ", booking);
        if(!booking) {
          return {};
        }
        return booking;
      } catch (e) {
        this.errorThrower.throw(e.message);
      }
    }
  
    @Post()
    async createBooking(
      @Body(new ValidationPipe({ transform: true })) body: BookingBodyDto,
    ): Promise<Booking> {
        const { arrivalTime } = body;
        const datetimeConverted = new Date(arrivalTime);
        if(datetimeConverted.toString() == 'Invalid Date') {
            this.errorThrower.throw("Invalid Date Value", 400);
        }
        const newdata = {
            guestName: body.guestName,
            contactInfo: body.contactInfo,
            arrivalTime: datetimeConverted,
            bookingStatus: body.bookingStatus,
            tableInfoId: body.tableInfoId
        }

        try {
            return await this.bookingService.createBooking(newdata);
        } catch (e) {
            this.errorThrower.throw(e.message);
        }
    }
  
    @Put(':id')
    async updateBooking(
        @Param('id') id: string,
        @Body() booking: Booking,
    ): Promise<Booking> {
        try {
            return await this.bookingService.updateBooking({
                where: { id: Number(id) },
                data: { 
                    guestName: booking.guestName,
                    contactInfo: booking.contactInfo,
                    arrivalTime: booking.arrivalTime,
                    bookingStatus: booking.bookingStatus
                },
            });
        } catch (e) {
            this.errorThrower.throw(e.message);
        }
    }
  
    @Delete(':id')
    async deleteBooking(@Param('id') id: string): Promise<Booking> {
        try {
            return await this.bookingService.deleteBooking({ id: Number(id) });
        } catch (e) {
            this.errorThrower.throw(e.message);
        }
    }
}