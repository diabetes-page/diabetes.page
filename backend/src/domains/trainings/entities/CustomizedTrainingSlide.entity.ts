import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { CustomizedTraining } from './CustomizedTraining.entity';

@Entity()
@Unique(['customizedTraining', 'originalSlideNumber'])
@Unique(['customizedTraining', 'newSlideNumber'])
export class CustomizedTrainingSlide extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => CustomizedTraining,
    (customizedTraining) => customizedTraining.slides,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  customizedTraining: CustomizedTraining;

  @Column()
  originalSlideNumber: number;

  @Column()
  newSlideNumber: number;

  @Column({ default: false })
  isHidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
