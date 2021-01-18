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

@Entity()
export class TrainingTemplate {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  // todo: unique constraint in relation table
  @ManyToMany(() => Client, (client) => client.trainingTemplates, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  clients: Client[];

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
