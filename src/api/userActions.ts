import { type registerUserResponse, type loginUserResponse, User } from '~/types/types';
import axiosInstance from './axiosInstance';

export const registerUser = async (username: string, password: string): Promise<registerUserResponse> => {
    const response = await axiosInstance.post('/users/register', { username, password });
    return response.data;
};

export const loginUser = async (username: string, password: string): Promise<loginUserResponse> => {
    const response = await axiosInstance.post('/api/auth/login', { username, password });
    return response.data;
};

export const fetchUser = async (): Promise<User> => {
    const response = await axiosInstance.get('/users/my-profile');
    return response.data;
}