import { z } from 'zod';
import { todoListItemCreateSchema, todoListItemSchema } from './todo-list-item.type';

export const todoListSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	items: z.array(todoListItemSchema),
});
export const todoListCreateSchema = todoListSchema.omit({ id: true }).extend({
	items: z.array(todoListItemCreateSchema),
});

export type TodoList = z.infer<typeof todoListSchema>;
export type TodoListCreate = z.infer<typeof todoListCreateSchema>;
