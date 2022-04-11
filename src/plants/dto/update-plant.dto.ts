import { Transform } from 'class-transformer';
import {
    IsAlphanumeric,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Min,
  min,
} from 'class-validator';
import { PlantStatus } from './plant-status.enum';

export class UpdatePlantDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @IsOptional()
  name: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  // update later
  @IsOptional()
  category: string;

  @IsNotEmpty()
  @IsEnum(PlantStatus)
  @IsOptional()
  status: PlantStatus;
  // update later
  @IsOptional()
  description: string;
}
