import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantsRepository } from './dao/plants.repository';
import { PlantsService } from './plants.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlantsRepository])],
  providers: [PlantsService],
  exports: [PlantsService],
})
export class PlantsModule {}
