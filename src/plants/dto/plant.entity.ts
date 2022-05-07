import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PlantStatus } from './plant-status.enum';

@Entity()
export class Plant {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty()
  @Column()
  name: string;
  
  @ApiProperty()
  @Column('money')
  price: number;
  
  @ApiProperty()
  @Column()
  category: string;

  @ApiProperty()
    @Column()
  status: PlantStatus;
  
  @ApiPropertyOptional()
  @Column({
    nullable: true
  })
  description: string;
  
  @ApiProperty()
  @Column()
  imgPath: string;

  @ApiProperty()
    @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  importedDate: Date;
}
