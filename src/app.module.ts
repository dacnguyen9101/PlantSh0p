import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Plant } from './plants/dto/plant.entity';
import { PlantsController } from './plants/plants.controller';
import { PlantsModule } from './plants/plants.module';

@Module({
  imports: [
    PlantsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'PlantSh0p',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Plant],
    }),
  ],
  controllers: [AppController, PlantsController],
  providers: [AppService],
})
export class AppModule {}
