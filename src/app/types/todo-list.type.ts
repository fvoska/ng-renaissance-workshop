import { z } from 'zod';
import { todoListItemSchema } from './todo-list-item.type';

export const todoListSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	items: z.array(todoListItemSchema),
});

export type TodoList = z.infer<typeof todoListSchema>;
