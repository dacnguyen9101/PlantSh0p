import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { PlantStatus } from './plant-status.enum';
import { PlantType } from './plant-type.enum';

export class UpdatePlantDto {
  @ApiPropertyOptional()
  @IsString()
  @Length(1, 50)
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsEnum(PlantType)
  @IsOptional()
  category: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imgPath: string;

  @ApiPropertyOptional({
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  @ApiPropertyOptional({
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  quantity: number;

  @ApiPropertyOptional()
  @IsEnum(PlantStatus)
  @IsOptional()
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
