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

export class TableInfoBodyDto {
    @IsString()
    @IsNotEmpty()
    tableNo: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['M','L'])
    tableSize: string;
}