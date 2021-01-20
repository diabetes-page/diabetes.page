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
import { CustomizedTraining } from '../../trainings/entities/CustomizedTraining.entity';
import { Manager } from './Manager.entity';
import { User } from './User.entity';

@Entity()
export class Consultant extends BaseEntity {
  @PrimaryGeneratedColumn()
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
