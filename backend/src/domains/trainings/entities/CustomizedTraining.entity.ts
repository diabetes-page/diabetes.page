import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Consultant } from '../../users/entities/Consultant.entity';
import { TrainingTemplate } from './TrainingTemplate.entity';
import { Appointment } from '../../appointments/entities/Appointment.entity';

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

  @OneToMany(() => Appointment, (appointment) => appointment.customizedTraining)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
