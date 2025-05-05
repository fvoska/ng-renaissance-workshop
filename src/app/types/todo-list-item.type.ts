import { z } from 'zod';

export const todoListItemSchema = z.object({
	id: z.string(),
	text: z.string(),
	completed: z.boolean(),
});
export const todoListItemCreateSchema = todoListItemSchema.omit({ id: true });

export type TodoListItem = z.infer<typeof todoListItemSchema>;
export type TodoListItemCreate = z.infer<typeof todoListItemCreateSchema>;
