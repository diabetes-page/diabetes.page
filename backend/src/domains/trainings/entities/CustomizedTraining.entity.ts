import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Consultant } from '../../users/entities/Consultant.entity';
import { TrainingTemplate } from './TrainingTemplate.entity';

@Entity()
@Unique(['consultant', 'trainingTemplate'])
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
