import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from './User.entity';
import { Manager } from './Manager.entity';
import { CustomizedTraining } from '../../trainings/entities/CustomizedTraining.entity';

@Entity()
export class Consultant extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => CustomizedTraining, (training) => training.consultant)
  customizedTrainings: CustomizedTraining[];

  @OneToOne(() => Manager)
  asManager: Manager | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
