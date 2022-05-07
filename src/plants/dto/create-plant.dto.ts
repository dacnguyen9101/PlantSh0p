import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { PlantStatus } from './plant-status.enum';
import { PlantType } from './plant-type.enum';

// check null
// min
// enum


export class CreatePlantDto {
  // REQUIRE
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PlantType)
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imgPath: string;

  @ApiProperty({
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsEnum(PlantStatus)
  @IsNotEmpty()
  status: PlantStatus;

  // OPTS
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    default: 'Current date',
  })
  @IsDateString()
  @IsOptional()
  importedDate: Date;
}
