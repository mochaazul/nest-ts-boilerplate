import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
