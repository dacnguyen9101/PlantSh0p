import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePlantDto } from '../dto/create-plant.dto';
import { Plant } from '../dto/plant.entity';
import { UpdatePlantDto } from '../dto/update-plant.dto';

const NOT_AFFECTED = 0;

@EntityRepository(Plant)
export class PlantsRepository extends Repository<Plant> {
  constructor() {
    super();
  }

  async createPlant(createPlantDto: CreatePlantDto): Promise<Plant> {
    const { name, price, category, quantity, imgPath, status, description } =
      createPlantDto;

    const plant = this.create({
      name,
      price,
      category,
      imgPath,
      quantity,
      status,
      // opts
      importedDate: createPlantDto.importedDate || new Date(),
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
    // const plant = await this.getPlant(id);

    // Object.keys(updatePlantDto).map((key) => {
    //   if (updatePlantDto[key]) {
    //     plant[key] = updatePlantDto[key];
    //   }
    // });

    // await this.save(plant);

    const asArray = Object.entries(updatePlantDto);
    const filtered = asArray.filter(
      ([key, value]) => value !== null && value !== undefined,
    );
    const updatePlantFiltered = Object.fromEntries(filtered);

    const result = await this.update(id, updatePlantFiltered);

    if (result.affected === NOT_AFFECTED) {
      throw new NotFoundException(`Not found a plant with id ${id}`);
    }
  }

  async deletePlant(id: string): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === NOT_AFFECTED) {
      throw new NotFoundException(`Not found a plant with id ${id}`);
    }
  }
}
