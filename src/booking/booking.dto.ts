import { 
    IsNotEmpty, 
    IsString, 
    IsArray, 
    IsBoolean, 
    IsOptional, 
    IsInt, 
    IsIn, 
    ValidateNested, 
    isNotEmpty
} from 'class-validator';

export class BookingBodyDto {
    @IsString()
    @IsNotEmpty()
    guestName: string;

    @IsString()
    @IsNotEmpty()
    contactInfo: string;

    @IsString()
    @IsNotEmpty()
    arrivalTime: string;

    @IsBoolean()
    @IsNotEmpty()
    bookingStatus: boolean;

    @IsInt()
    @IsNotEmpty()
    tableInfoId: number;
}