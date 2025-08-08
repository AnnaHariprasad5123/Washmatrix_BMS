import axios from "axios";
import { useAuthStore } from "../store/authStore";
import type {
  Book,
  CreateBookRequest,
  UpdateBookRequest,
} from "../utils/interfaces";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authHeader = useAuthStore.getState().getAuthHeader();
  if (authHeader) {
    config.headers.Authorization = authHeader;
  }
  return config;
});

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get("/v1/books/");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Failed to fetch books");
  }
};

export const getBook = async (id: number): Promise<Book> => {
  try {
    const response = await api.get(`/v1/books/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw new Error("Failed to fetch book");
  }
};

export const createBook = async (book: CreateBookRequest): Promise<Book> => {
  try {
    const response = await api.post("/v1/books/", book);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Failed to create book");
  }
};

export const updateBook = async (book: UpdateBookRequest): Promise<Book> => {
  try {
    const response = await api.put(`/v1/books/${book.id}/`, book);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw new Error("Failed to update book");
  }
};

export const deleteBook = async (id: number): Promise<void> => {
  try {
    await api.delete(`/v1/books/${id}/`);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Failed to delete book");
  }
};

export default api;
