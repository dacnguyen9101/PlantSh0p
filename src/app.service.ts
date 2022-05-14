import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PlantStatus } from './plants/dto/plant-status.enum';
import data from './seed/seeds.json';

@Injectable()
export class AppService {
  async seed(): Promise<void> {
    data.forEach((plant) => {
      const randomStatus =
        Object.keys(PlantStatus)[
          Math.floor(Math.random() * Object.keys(PlantStatus).length)
        ];
      axios
        .post('http://localhost:9101/plants', {
          name: plant.title,
          price: plant.price,
          category: plant.category,
          status: PlantStatus[randomStatus],
          description: plant.desc,
          imgPath: plant.imgPath,
          quantity: plant.quantity,
          importedDate: plant.importedDate,
        })
        .then((response) => {
          console.log(response.data);
        });
    });
  }
}
