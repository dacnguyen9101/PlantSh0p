import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PlantStatus } from './plant-status.enum';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column('money')
  price: number;
  @Column()
  category: string;
  @Column()
  status: PlantStatus;
  @Column()
  description: string;
  @Column()
  imgPath: string;
  @Column()
  quantity: number;
  @Column()
  importedDate: Date;
}
