import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Client } from '../../clients/entities/Client.entity';
import { Consultant } from './Consultant.entity';
import { UserAppointmentAssignment } from '../../appointments/entities/UserAppointmentAssignment.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'character varying', nullable: true })
  verificationToken: string | null;

  @ManyToOne(() => Client, (client) => client.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  client: Client;

  @OneToMany(() => UserAppointmentAssignment, (assignment) => assignment.user)
  appointmentAssignments: UserAppointmentAssignment[];

  @OneToOne(() => Consultant)
  asConsultant: Consultant | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  public get sortingKey(): string[] {
    return this.name.trim().split(/\s+/).reverse();
  }
}
