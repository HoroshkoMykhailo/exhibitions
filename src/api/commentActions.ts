import axiosInstance from "./axiosInstance";
import { CommentI } from "~/types/types";

export const getComments = async (id: number): Promise<CommentI[]> => {
    const response = await axiosInstance.get(`/api/comments/${id}`);
    return response.data;
};

export const writeComment = async (id: number, text: string) => {
    const response = await axiosInstance.post(`/api/comments/${id}`, { text });
    return response.data;
};

export const deleteComment = async (id: number) => {
    const response = await axiosInstance.delete(`/api/comments/${id}`);
    return response.data;
}