import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Client } from '../../clients/entities/Client.entity';
import { CustomizedTraining } from './CustomizedTraining.entity';

@Entity()
export class TrainingTemplate extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  // todo: unique constraint in relation table
  @ManyToMany(() => Client, (client) => client.trainingTemplates, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  clients: Client[];

  @OneToMany(() => CustomizedTraining, (training) => training.trainingTemplate)
  customizedTrainings: CustomizedTraining[];

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  documentPath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
