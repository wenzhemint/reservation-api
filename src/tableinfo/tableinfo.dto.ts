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

enum TableSize {
    Medium = 'M',
    Large = 'L'
}

export class TableInfoBodyDto {
    @IsString()
    @IsNotEmpty()
    tableNo: string;

    @IsString()
    @IsNotEmpty()
    @IsIn([TableSize.Medium, TableSize.Large])
    tableSize: string;
}

export class getAllAvailableTablesDto {
    @IsString()
    @IsNotEmpty()
    arrivalTime: string;
}