import axios, { AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from '../../config/networking';
import { LOCAL_STORAGE_JWT_KEY } from '../../config/security';

const instance = axios.create({
  baseURL: BACKEND_URL,
});

export const Get = instance.get;
export const Post = instance.post;
export const Put = instance.put;
export const Patch = instance.patch;
export const Delete = instance.delete;

export const withAuth = async (
  config: AxiosRequestConfig = {},
): Promise<AxiosRequestConfig> => {
  const token = await localStorage.getItem(LOCAL_STORAGE_JWT_KEY);

  if (token) {
    return {
      ...config,
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  // todo: handle case when no token is present

  return config;
};
