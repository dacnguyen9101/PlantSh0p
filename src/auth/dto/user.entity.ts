import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    length: 150,
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    enum: UserRole
  })
  role: string
}
