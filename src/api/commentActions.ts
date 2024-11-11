import axiosInstance from "./axiosInstance";
import { CommentI } from "~/types/types";

export const getComments = async (id: number): Promise<CommentI[]> => {
    const response = await axiosInstance.get(`/api/exhibits/${id}/comments/`);
    return response.data;
};

export const writeComment = async (id: number, text: string) => {
    const response = await axiosInstance.post(`/api/exhibits/${id}/comments/`, { text });
    return response.data;
};

export const deleteComment = async (exhibitId: number, id: number) => {
    const response = await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments/${id}`);
    return response.data;
}