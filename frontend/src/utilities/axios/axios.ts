import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

export const Get = instance.get;
export const Post = instance.post;
export const Put = instance.put;
export const Patch = instance.patch;

// todo: generate all requests directly from backend code anyways
export const withAuth = (
  config: AxiosRequestConfig = {},
): AxiosRequestConfig => {
  const token = localStorage.getItem('token'); // todo: key name in .env

  if (token) {
    return {
      ...config,
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  // todo: handle case when no token is present

  return config;
};
