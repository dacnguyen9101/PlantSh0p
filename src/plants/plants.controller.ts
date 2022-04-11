import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { Plant } from './dto/plant.entity';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PlantsService } from './plants.service';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}
  /**
   GET ALL PLANTS OR FILTER      
   */
  @Get()
  getPLants(): Promise<Plant[]> {
    return this.plantsService.getPlants();
  }

  /**
   GET PLANT OR FILTER      
   */
  @Get(':id')
  getPLant(@Param('id', ParseUUIDPipe) id: string): Promise<Plant> {
    return this.plantsService.getPlant(id);
  }

  /**
   CREATE PLANT     
   */
  @Post()
  createPlant(
    @Body(ValidationPipe) createPlantDto: CreatePlantDto,
  ): Promise<Plant> {
    return this.plantsService.createPlant(createPlantDto);
  }

  /**
   UPDATE PLANT     
   */
  @Patch(':id')
  updatePlant(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updatePlantDto: UpdatePlantDto,
  ): Promise<void> {
    return this.plantsService.updatePlant(id, updatePlantDto);
  }

  @Delete(':id')
  deletePlant(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.plantsService.deletePlant(id);
  }
}
