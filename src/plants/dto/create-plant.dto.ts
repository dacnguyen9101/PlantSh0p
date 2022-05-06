import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { PlantStatus } from './plant-status.enum';
import { PlantType } from './plant-type.enum';

export class CreatePlantDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsEnum(PlantType)
  category: string;

  @IsEnum(PlantStatus)
  status: PlantStatus;
  // update later
  description: string;

  @IsNotEmpty()
  imgPath: string;

  @IsNotEmpty()
  quantity: number;

  importedDate: Date;
}
