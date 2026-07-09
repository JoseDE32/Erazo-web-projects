import axios from 'axios';
import type { CreateUpdateTask, FilterSortTask, Task } from '../types/Task';

const api = axios.create({
  baseURL: 'http://localhost:8082/tasks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<Task[]>('');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTaskById = async (id: number): Promise<Task | null> => {
  try {
    const response = await api.get<Task>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postFilteredSortedTasks = async (filterSortTask: Partial<Omit<FilterSortTask, never>>): Promise<Task[]> => {
  try {
    const response = await api.post<Task[]>('/postPaginationFilterSort', filterSortTask );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTask = async (task: Omit<CreateUpdateTask, 'id' | 'createAt' | 'updatedAt'>): Promise<CreateUpdateTask | null> => {
  try {
    const response = await api.post<CreateUpdateTask>('', task);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTask = async (id: number, task: Partial<Omit<CreateUpdateTask, 'id' | 'createAt' | 'updatedAt'>>): Promise<CreateUpdateTask | null> => {
  try {
    const response = await api.put<CreateUpdateTask>(`/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const patchUpdateTask = async (id: number, task: Partial<Omit<Task, 'id' | 'TaskStatus' | 'createAt' | 'updatedAt'>>): Promise<Task | null> => {
  try {
    const response = await api.patch<Task>(`/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(error);
  }
};
