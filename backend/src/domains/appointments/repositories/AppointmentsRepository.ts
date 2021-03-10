import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '../../users/entities/User.entity';
import { Appointment } from '../entities/Appointment.entity';

@EntityRepository(Appointment)
export class AppointmentsRepository extends AbstractRepository<Appointment> {
  /**
   * If user is a consultant, check if the appointment exists.
   * Otherwise, check if the appointment exists and the user is assigned to it through a working group.
   * @param user
   * @param appointmentId
   */
  async canUserSee(user: User, appointmentId: string): Promise<boolean> {
    const isConsultant = !!(await user.loadAsConsultant());

    const query = this.repository
      .createQueryBuilder('appointment')
      .select('appointment.id')
      .where('appointment.id = :appointmentId', {
        appointmentId,
      });

    if (!isConsultant) {
      query
        .innerJoin('appointment.workingGroups', 'workingGroup')
        .innerJoin('workingGroup.users', 'user')
        .andWhere('user.id = :userId', {
          userId: user.id,
        });
    }

    return !!(await query.getOne());
  }

  async getParticipantAppointments(user: User): Promise<Appointment[]> {
    const q = this.repository
      .createQueryBuilder('appointment')
      .innerJoinAndSelect('appointment.workingGroups', 'workingGroup')
      .innerJoin('workingGroup.users', 'user')
      .andWhere('user.id = :userId', {
        userId: user.id,
      })
      .orderBy('appointment.startsAt, workingGroup.name');

    return q.getMany();
  }
}
