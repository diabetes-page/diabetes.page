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
import { TrainingTemplate } from '../../trainings/entities/TrainingTemplate.entity';
import { User } from '../../users/entities/User.entity';

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
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
