import api from '../../lib/axios';
import type { ApiResponse, LoginDto, LoginResponse, ChangePasswordDto } from '@/types';

export const authService = {
    login: (dto: LoginDto) => api.post<ApiResponse<LoginResponse>>('api/authorization/login', dto),
    logOut: (refreshToken: string) => api.post<ApiResponse<string>>('api/authorization/logout', { refreshToken }),
    changePassword: (dto: ChangePasswordDto) => api.post<ApiResponse<string>>('api/authorization/change-password', dto),
    refresh: (refreshToken: string) => api.post<{ accessToken: string }>('api/authorization/refresh', { refreshToken }),
};