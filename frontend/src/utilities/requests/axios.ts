import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { isValid, parseISO } from 'date-fns';
import { BACKEND_URL } from '../../config/networking';
import { LOCAL_STORAGE_JWT_KEY } from '../../config/security';

const instance = axios.create({
  baseURL: BACKEND_URL,
  transformResponse: (jsonData) =>
    // Transform date strings to date objects
    JSON.parse(jsonData, (key, value) => {
      if (typeof value === 'string') {
        const date = parseISO(value);

        if (isValid(date)) {
          return date;
        }
      }

      return value;
    }),
});

export const Get = instance.get;
export const Post = instance.post;
export const Put = instance.put;
export const Patch = instance.patch;
export const Delete = instance.delete;

export const withAuth = async (
  config: AxiosRequestConfig = {},
): Promise<AxiosRequestConfig> => {
  const token = await AsyncStorage.getItem(LOCAL_STORAGE_JWT_KEY);

  if (token) {
    return {
      ...config,
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  // todo: handle case when no token is present

  return config;
};
