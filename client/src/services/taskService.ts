import type { AxiosInstance, AxiosResponse } from 'axios';
import type { TaskFormType, TaskType } from '../types/tasksTypes';
import { TaskSchema, TasksListSchema } from '../utils/validators';
import axiosInstance from './apiInstance';

class TasksService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async getTasks(): Promise<TaskType[]> {
    const response = await this.apiInstance.get<TaskType[]>('/tasks');
    return TasksListSchema.parse(response.data);
  }

  async addTask(formData: TaskFormType): Promise<TaskType> {
    const response = await this.apiInstance.post<TaskType>('/tasks', formData);
    return TaskSchema.parse(response.data);
  }

  async deleteTask(id: TaskType['id']): Promise<AxiosResponse> {
    return this.apiInstance.delete(`/tasks/${id}`);
  }

  async updateTask(id: TaskType['id'], formData: TaskFormType): Promise<TaskType> {
    const response = await this.apiInstance.patch<TaskType>(`/tasks/${id}`, formData);
    return TaskSchema.parse(response.data);
  }
}

export default new TasksService(axiosInstance);
