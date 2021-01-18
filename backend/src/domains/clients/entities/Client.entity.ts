import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../../users/entities/User.entity';
import { TrainingTemplate } from '../../trainings/entities/TrainingTemplate.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.client)
  users: User[];

  // todo: unique constraint in relation table
  @ManyToMany(() => TrainingTemplate, (template) => template.clients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  trainingTemplates: TrainingTemplate[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}