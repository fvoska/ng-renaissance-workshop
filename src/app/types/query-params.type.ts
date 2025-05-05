import { z } from 'zod';

// Pagination parameters schema
export const paginationParamsSchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().positive().default(10),
});

export type PaginationParams = z.infer<typeof paginationParamsSchema>;

// Sorting parameters schema
export const sortDirectionSchema = z.enum(['asc', 'desc']).default('asc');
export const todoListSortFieldSchema = z.enum(['title', 'description']).default('title');

export const sortParamsSchema = z.object({
	sortBy: todoListSortFieldSchema,
	direction: sortDirectionSchema,
});

export type SortParams = z.infer<typeof sortParamsSchema>;

// Filter parameters schema
export const filterParamsSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	hasCompletedItems: z.coerce.boolean().optional(),
});

export type FilterParams = z.infer<typeof filterParamsSchema>;

// Combined query parameters schema
export const todoListQueryParamsSchema = z.object({
	...paginationParamsSchema.shape,
	...sortParamsSchema.shape,
	...filterParamsSchema.shape,
});

export type TodoListQueryParams = z.infer<typeof todoListQueryParamsSchema>;

// Response with pagination metadata
export interface PaginatedResponse<T> {
	data: T[];
	meta: {
		currentPage: number;
		totalPages: number;
		pageSize: number;
		totalItems: number;
	};
}
