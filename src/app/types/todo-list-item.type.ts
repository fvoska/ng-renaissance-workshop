import { z } from 'zod';

export const todoListItemSchema = z.object({
	id: z.string(),
	text: z.string(),
	completed: z.boolean(),
});

export type TodoListItem = z.infer<typeof todoListItemSchema>;
