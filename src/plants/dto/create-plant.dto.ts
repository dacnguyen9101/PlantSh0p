import { Transform } from 'class-transformer';
import {
    IsAlphanumeric,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  Min,
  min,
} from 'class-validator';
import { PlantStatus } from './plant-status.enum';

export class CreatePlantDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  // update later
  category: string;

  @IsEnum(PlantStatus)
  status: PlantStatus;
  // update later
  description: string;
}
