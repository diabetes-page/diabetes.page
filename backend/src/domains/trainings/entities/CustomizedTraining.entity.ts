import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Client } from '../../clients/entities/Client.entity';
import { Consultant } from '../../users/entities/Consultant.entity';
import { TrainingTemplate } from './TrainingTemplate.entity';

@Entity()
export class CustomizedTraining {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ManyToOne(() => Consultant, (consultant) => consultant.customizedTrainings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  consultant: Consultant;

  @ManyToOne(
    () => TrainingTemplate,
    (template) => template.customizedTrainings,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  trainingTemplate: TrainingTemplate;

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
