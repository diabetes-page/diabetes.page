import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { loadNotNullSingularRelation } from '../../../utilities/relations';
import { Consultant } from './Consultant.entity';

@Entity()
export class Manager extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Consultant, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  consultant: Consultant;

  async loadConsultant(): Promise<Consultant> {
    return (this.consultant = await loadNotNullSingularRelation(
      this,
      'consultant',
    ));
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
