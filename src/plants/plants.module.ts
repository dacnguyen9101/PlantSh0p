import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantsRepository } from './dao/plants.repository';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlantsRepository])],
  providers: [PlantsService],
  controllers: [PlantsController],
  exports: [PlantsService],
})
export class PlantsModule {}
