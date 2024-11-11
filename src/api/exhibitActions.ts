import { ErrorResponse, Exhibit, ExhibitsResponse } from '~/types/types';
import axiosInstance from './axiosInstance';

export const fetchExhibits = async (page: number, limit: number, myPosts?: boolean): Promise<ExhibitsResponse> => {
  const response = await axiosInstance.get(`/api/exhibits${myPosts ? '/my-posts' : ''}?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchExhibitById = async (id: number): Promise<Exhibit> => {
  const response = await axiosInstance.get(`/api/exhibits/post/${id}`);
  return response.data;
};

export const createExhibit = async (description: string, image: File): Promise<Exhibit | ErrorResponse> => {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('image', image);
  const response = await axiosInstance.post("/api/exhibits", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteExhibit = async (id: number) => {
  const response = await axiosInstance.delete(`/api/exhibits/${id}`);
  return response.data;
};
