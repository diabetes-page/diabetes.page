/**
 * This file was autogenerated using the route definitions from the backend.
 */
import { AxiosResponse } from 'axios';
import { AppointmentInWorkingGroupResource as BackendAppointmentInWorkingGroupResource } from '../../../../backend/src/domains/appointments/resources/AppointmentInWorkingGroupResource';
import { AppointmentResource as BackendAppointmentResource } from '../../../../backend/src/domains/appointments/resources/AppointmentResource';
import { Resource as BackendCreateAppointmentResource } from '../../../../backend/src/domains/appointments/routes/createAppointment/Resource';
import { Resource as BackendIndexAppointmentsForUserResource } from '../../../../backend/src/domains/appointments/routes/indexAppointmentsForUser/Resource';
import { Resource as BackendStartAppointmentResource } from '../../../../backend/src/domains/appointments/routes/startAppointment/Resource';
import { Resource as BackendCheckAuthStatusResource } from '../../../../backend/src/domains/auth/routes/checkAuthStatus/Resource';
import { Resource as BackendLoginResource } from '../../../../backend/src/domains/auth/routes/login/Resource';
import { ConferenceResource as BackendConferenceResource } from '../../../../backend/src/domains/conferences/resources/ConferenceResource';
import { Resource as BackendShowConferenceTokenResource } from '../../../../backend/src/domains/conferences/routes/showConferenceToken/Resource';
import { TeachingBaseDocumentResource as BackendTeachingBaseDocumentResource } from '../../../../backend/src/domains/teachingBases/resources/TeachingBaseDocumentResource';
import { TopicResource as BackendTopicResource } from '../../../../backend/src/domains/teachingBases/resources/TopicResource';
import { BasicTrainingResource as BackendBasicTrainingResource } from '../../../../backend/src/domains/trainings/resources/BasicTrainingResource';
import { FullTrainingResource as BackendFullTrainingResource } from '../../../../backend/src/domains/trainings/resources/FullTrainingResource';
import { Resource as BackendShowTrainingsResource } from '../../../../backend/src/domains/trainings/routes/showTrainings/Resource';
import { BasicConsultantResource as BackendBasicConsultantResource } from '../../../../backend/src/domains/users/resources/BasicConsultantResource';
import { BasicUserResource as BackendBasicUserResource } from '../../../../backend/src/domains/users/resources/BasicUserResource';
import { SensitiveDataUserResource as BackendSensitiveDataUserResource } from '../../../../backend/src/domains/users/resources/SensitiveDataUserResource';
import { Resource as BackendIndexUsersResource } from '../../../../backend/src/domains/users/routes/indexUsers/Resource';
import { BasicWorkingGroupResource as BackendBasicWorkingGroupResource } from '../../../../backend/src/domains/workingGroups/resources/BasicWorkingGroupResource';
import { Resource as BackendShowWorkingGroupsResource } from '../../../../backend/src/domains/workingGroups/routes/showWorkingGroups/Resource';
import { Get, Post, withAuth } from './axios';

export type AppointmentInWorkingGroupResource = BackendAppointmentInWorkingGroupResource;
export type AppointmentResource = BackendAppointmentResource;
export type CreateAppointmentResource = BackendCreateAppointmentResource;
export type CreateAppointmentParameters = {
  startsAt: string;
  endsAt: string;
};
export type IndexAppointmentsForUserResource = BackendIndexAppointmentsForUserResource;
export type StartAppointmentResource = BackendStartAppointmentResource;
export type CheckAuthStatusResource = BackendCheckAuthStatusResource;
export type LoginResource = BackendLoginResource;
export type LoginParameters = {
  email: string;
  password: string;
};
export type ConferenceResource = BackendConferenceResource;
export type ShowConferenceTokenResource = BackendShowConferenceTokenResource;
export type TeachingBaseDocumentResource = BackendTeachingBaseDocumentResource;
export type TopicResource = BackendTopicResource;
export type BasicTrainingResource = BackendBasicTrainingResource;
export type FullTrainingResource = BackendFullTrainingResource;
export type ShowTrainingsResource = BackendShowTrainingsResource;
export type BasicConsultantResource = BackendBasicConsultantResource;
export type BasicUserResource = BackendBasicUserResource;
export type SensitiveDataUserResource = BackendSensitiveDataUserResource;
export type CreateUserParameters = {
  email: string;
  name: string;
};
export type IndexUsersResource = BackendIndexUsersResource;
export type BasicWorkingGroupResource = BackendBasicWorkingGroupResource;
export type ShowWorkingGroupsResource = BackendShowWorkingGroupsResource;

export const requests = {
  createAppointment: async (
    trainingId: string,
    data: CreateAppointmentParameters,
  ): Promise<AxiosResponse<CreateAppointmentResource>> =>
    Post(`/trainings/${trainingId}/appointments`, data, await withAuth()),

  indexAppointmentsForUser: async (
    userId: string,
  ): Promise<AxiosResponse<IndexAppointmentsForUserResource>> =>
    Get(`/users/${userId}/appointments`, await withAuth()),

  showAppointment: async (
    appointmentId: string,
  ): Promise<AxiosResponse<AppointmentResource>> =>
    Get(`appointments/${appointmentId}`, await withAuth()),

  startAppointment: async (
    appointmentId: string,
  ): Promise<AxiosResponse<StartAppointmentResource>> =>
    Post(`appointments/${appointmentId}/start`, {}, await withAuth()),

  checkAuthStatus: async (): Promise<AxiosResponse<CheckAuthStatusResource>> =>
    Get(`/auth/status`, await withAuth()),

  login: async (data: LoginParameters): Promise<AxiosResponse<LoginResource>> =>
    Post(`/auth/login`, data, await withAuth()),

  showConferenceToken: async (
    appointmentId: string,
  ): Promise<AxiosResponse<ShowConferenceTokenResource>> =>
    Get(`/appointments/${appointmentId}/conference/token`, await withAuth()),

  showAppointmentTraining: async (
    appointmentId: string,
  ): Promise<AxiosResponse<FullTrainingResource>> =>
    Get(`/appointments/${appointmentId}/training`, await withAuth()),

  showTrainings: async (): Promise<AxiosResponse<ShowTrainingsResource>> =>
    Get(`/trainings`, await withAuth()),

  createUser: async (
    data: CreateUserParameters,
  ): Promise<AxiosResponse<SensitiveDataUserResource>> =>
    Post(`/users`, data, await withAuth()),

  indexUsers: async (): Promise<AxiosResponse<IndexUsersResource>> =>
    Get(`/users`, await withAuth()),

  showUser: async (
    userId: string,
  ): Promise<AxiosResponse<SensitiveDataUserResource>> =>
    Get(`/users/${userId}`, await withAuth()),

  showWorkingGroups: async (): Promise<
    AxiosResponse<ShowWorkingGroupsResource>
  > => Get(`/working-groups`, await withAuth()),
};
