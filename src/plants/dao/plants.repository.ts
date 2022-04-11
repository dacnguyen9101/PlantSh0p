import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePlantDto } from '../dto/create-plant.dto';
import { Plant } from '../dto/plant.entity';
import { UpdatePlantDto } from '../dto/update-plant.dto';

@EntityRepository(Plant)
export class PlantsRepository extends Repository<Plant> {
  constructor() {
    super();
  }

  async createPlant(createPlantDto: CreatePlantDto): Promise<Plant> {
    const { name, price, category, status, description } = createPlantDto;
    const plant = this.create({
      name,
      price,
      category,
      status,
      description,
    });
    await this.save(plant);
    return plant;
  }

  async getPlant(id: string): Promise<Plant> {
    const plant = await this.findOne(id);
    if (!plant) {
      throw new NotFoundException(`Not found a plant with id ${id}`);
    }
    return plant;
  }

  async updatePlant(id: string, updatePlantDto: UpdatePlantDto): Promise<void> {
    const { name, price, category, status, description } = updatePlantDto;
    const plant = await this.getPlant(id);
    if (name) {
      plant.name = name;
    }
    if (price) {
      plant.price = price;
    }
    if (category) {
      plant.category = category;
    }
    if (status) {
      plant.status = status;
    }
    if (description) {
      plant.description = description;
    }
    await this.save(plant);
  }

  async deletePlant(id: string): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Not found a plant with id ${id}`);
    }
  }
}
