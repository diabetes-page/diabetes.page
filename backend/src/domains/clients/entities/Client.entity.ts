import {
  BaseEntity,
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
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.client)
  users: User[];

  // todo: unique constraint in relation table
  // todo: set ON UPDATE CASCADE in SQL, see https://github.com/typeorm/typeorm/issues/4980
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
