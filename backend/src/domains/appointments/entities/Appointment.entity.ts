import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../../users/entities/User.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  conferenceRoom: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[]; // todo: teachers should not be assigned this way, only students

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @Column('int')
  presentationIndex: number;

  @Column()
  officialMessagesPublicKey: string;

  @Column()
  officialMessagesPrivateKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
