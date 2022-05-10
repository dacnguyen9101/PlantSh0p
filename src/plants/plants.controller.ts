import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreatePlantDto } from './dto/create-plant.dto';
import { Plant } from './dto/plant.entity';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PlantsService } from './plants.service';

@ApiTags('plants')
@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}
  /**
   GET ALL PLANTS OR FILTER      
   */
  @ApiOkResponse({ type: Plant, isArray: true, description: 'get all plants' })
  @Get()
  getPLants(): Promise<Plant[]> {
    return this.plantsService.getPlants();
  }

  /**
   GET PLANT OR FILTER      
   */
  @ApiOkResponse({ type: Plant })
  @ApiQuery({ name: 'id' })
  @Get(':id')
  getPLant(@Param('id', ParseUUIDPipe) id: string): Promise<Plant> {
    return this.plantsService.getPlant(id);
  }

  /**
   CREATE PLANT     
   */
  @ApiCreatedResponse({ type: CreatePlantDto })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  createPlant(
    @Body(ValidationPipe) createPlantDto: CreatePlantDto,
  ): Promise<Plant> {
    return this.plantsService.createPlant(createPlantDto);
  }

  /**
   UPDATE PLANT     
   */
  @ApiOkResponse({
    type: UpdatePlantDto,
    description: 'all req body is optional',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  updatePlant(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updatePlantDto: UpdatePlantDto,
  ): Promise<void> {
    return this.plantsService.updatePlant(id, updatePlantDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  deletePlant(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.plantsService.deletePlant(id);
  }
}
