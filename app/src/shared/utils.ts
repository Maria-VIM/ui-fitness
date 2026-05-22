import axios, {type AxiosInstance} from "axios";

const baseUrl: string = import.meta.env.VITE_BASE_URL;
export const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
