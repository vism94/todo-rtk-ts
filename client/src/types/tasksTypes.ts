import type { z } from 'zod';
import type { TaskSchema } from '../utils/validators';

export type TaskType = z.infer<typeof TaskSchema>;

export type TaskFormType = Omit<TaskType, 'id'>;