import { z } from 'zod';

export const todoListItemSchema = z.object({
	id: z.string(),
	text: z.string().min(1),
	completed: z.boolean(),
});
export const todoListItemCreationPayloadSchema = todoListItemSchema.omit({ id: true });

export type TodoListItem = z.infer<typeof todoListItemSchema>;
export type TodoListItemCreationPayload = z.infer<typeof todoListItemCreationPayloadSchema>;
