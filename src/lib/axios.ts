import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useSessionStore } from '../stores/sessionStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5038';

export const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Queue para manejar requests mientras se renueva el token
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

let isRefreshing = false;

const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach(({resolve, reject}) => {
        if (error) {
            reject(error);
        } else {
            resolve(token as string);
        }
    });
    failedQueue = [];
};

// Request interceptor
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { accessToken } = useSessionStore.getState();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axiosClient(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { refreshToken } = useSessionStore.getState();
                const response = await axios.post(`${API_URL}/auth/refresh`, {
                    refreshToken,
                });

                const { accessToken } = response.data;
                useSessionStore.setState({ accessToken });

                processQueue(null, accessToken);
                return axiosClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                useSessionStore.setState({ accessToken: null, refreshToken: null });
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;