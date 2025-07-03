import { z } from 'zod';
import { todoListItemCreationPayloadSchema, todoListItemSchema } from './todo-list-item.type';

export const todoListSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
	description: z.string(),
	items: z.array(todoListItemSchema).min(1),
});
export const todoListCreationPayloadSchema = todoListSchema.omit({ id: true }).extend({
	items: z.array(todoListItemCreationPayloadSchema),
});
export const todoListUpdatePayloadSchema = todoListSchema.omit({ id: true }).extend({
	items: z.array(z.union([todoListItemSchema, todoListItemCreationPayloadSchema])),
});

export type TodoList = z.infer<typeof todoListSchema>;
export type TodoListCreationPayload = z.infer<typeof todoListCreationPayloadSchema>;
export type TodoListUpdatePayload = z.infer<typeof todoListUpdatePayloadSchema>;
