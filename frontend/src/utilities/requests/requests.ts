/**
 * This file was autogenerated using the route definitions from the backend.
 */
import { AxiosResponse } from 'axios';
import { Get, Post, Put, withAuth } from './axios';

export const createAppointment = async (): Promise<AxiosResponse> =>
  Post(`/appointments`, await withAuth());

export const showConferenceData = async (id: number): Promise<AxiosResponse> =>
  Get(`/appointments/${id}/conference`, await withAuth());

type SwitchConferenceSlideParameters = {
  presentationIndex: number;
};
export const switchConferenceSlide = async (
  id: number,
  params: SwitchConferenceSlideParameters,
): Promise<AxiosResponse> =>
  Put(`/appointments/${id}/conference/slide`, params, await withAuth());

export const checkAuthStatus = async (): Promise<AxiosResponse> =>
  Get(`/auth/status`, await withAuth());

type LoginParameters = {
  email: string;
  password: string;
};
export const login = async (params: LoginParameters): Promise<AxiosResponse> =>
  Post(`/auth/login`, params, await withAuth());

type RegisterParameters = {
  email: string;
  password: string;
  name: string;
};
export const register = async (
  params: RegisterParameters,
): Promise<AxiosResponse> => Post(`/auth/register`, params, await withAuth());

export const indexUsers = async (): Promise<AxiosResponse> =>
  Get(`/users`, await withAuth());
