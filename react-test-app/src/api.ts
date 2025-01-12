import axios from 'axios';
import { Task } from './Task';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';


// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}?_limit=10`);
  return response.data;
};

// Add a new task
export const addTask = async (title: string): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, {
    title,
    completed: false,
  });
  return response.data;
};

// Toggle task completion
export const toggleTask = async (id: number, completed: boolean): Promise<void> => {
  await axios.patch(`${API_URL}/${id}`, { completed });
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};