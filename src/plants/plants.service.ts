import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantsRepository } from './dao/plants.repository';
import { CreatePlantDto } from './dto/create-plant.dto';
import { Plant } from './dto/plant.entity';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(PlantsRepository)
    private plantsRepository: PlantsRepository,
  ) {}

  async getPlants(): Promise<Plant[]> {
    return await this.plantsRepository.find();
  }

  async getPlant(id: string): Promise<Plant> {
    return await this.plantsRepository.getPlant(id);
  }

  createPlant(createPlantDto: CreatePlantDto): Promise<Plant> {
    return this.plantsRepository.createPlant(createPlantDto);
  }

  updatePlant(id: string, updatePlantDto: UpdatePlantDto): Promise<void> {
    return this.plantsRepository.updatePlant(id, updatePlantDto);
  }

  deletePlant(id: string): Promise<void> {
    return this.plantsRepository.deletePlant(id)
  }
}
