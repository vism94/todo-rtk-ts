import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const TasksListSchema = z.array(TaskSchema);