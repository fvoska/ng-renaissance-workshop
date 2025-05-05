import { IDBPDatabase, openDB } from 'idb';
import { delay, http, HttpResponse } from 'msw';
import { z } from 'zod';
import {
	TodoList,
	TodoListCreationPayload,
	todoListCreationPayloadSchema,
	TodoListUpdatePayload,
	todoListUpdatePayloadSchema,
} from '../types/todo-list.type';

// Database setup
const DB_NAME = 'todo-app-db';
const TODO_LISTS_STORE = 'todoLists';
const DB_VERSION = 1;

// Random delay configuration
const MIN_DELAY_MS = 50;
const MAX_DELAY_MS = 800;

// Error configuration
const ERROR_RATE = 0.15; // 15% chance of returning a 500 error

// Helper function to generate a random delay
function getRandomDelay(): number {
	return Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;
}

// Helper function to determine if an error should be returned
function shouldReturnError(): boolean {
	return Math.random() < ERROR_RATE;
}

// Helper function to generate IDs
function generateId(): string {
	return crypto.randomUUID();
}

// Helper function to ensure all todo items have IDs
function ensureItemIds<T extends { items: { id?: string; text: string; completed: boolean }[] }>(
	data: T
): T & { items: { id: string; text: string; completed: boolean }[] } {
	return {
		...data,
		items: data.items.map(item => ({
			...item,
			id: item.id || generateId(),
		})),
	};
}

// Initialize IndexedDB
const dbPromise = openDB(DB_NAME, DB_VERSION, {
	upgrade(db: IDBPDatabase) {
		if (!db.objectStoreNames.contains(TODO_LISTS_STORE)) {
			db.createObjectStore(TODO_LISTS_STORE, { keyPath: 'id' });
		}
	},
});

// Helper functions for database operations
async function getDb(): Promise<IDBPDatabase> {
	return dbPromise;
}

async function getAllTodoLists(): Promise<TodoList[]> {
	const db = await getDb();
	return db.getAll(TODO_LISTS_STORE);
}

async function getTodoList(id: string): Promise<TodoList | undefined> {
	const db = await getDb();
	return db.get(TODO_LISTS_STORE, id);
}

async function createTodoList(todoListData: TodoListCreationPayload): Promise<TodoList> {
	const todoList: TodoList = {
		id: generateId(),
		...ensureItemIds(todoListData),
	};

	const db = await getDb();
	await db.put(TODO_LISTS_STORE, todoList);
	return todoList;
}

async function updateTodoList(id: string, todoListData: TodoListUpdatePayload): Promise<TodoList | null> {
	const db = await getDb();
	const existingTodoList = await db.get(TODO_LISTS_STORE, id);

	if (!existingTodoList) {
		return null;
	}

	const updatedTodoList = ensureItemIds({
		...todoListData,
		id,
	});

	await db.put(TODO_LISTS_STORE, updatedTodoList);
	return updatedTodoList;
}

async function deleteTodoList(id: string): Promise<boolean> {
	const db = await getDb();
	const existingTodoList = await db.get(TODO_LISTS_STORE, id);

	if (!existingTodoList) {
		return false;
	}

	await db.delete(TODO_LISTS_STORE, id);
	return true;
}

// Validation helpers
async function validateRequestBody<T>(
	request: Request,
	schema: z.ZodType<T>
): Promise<{ success: true; data: T } | { success: false; errors: z.ZodError }> {
	try {
		const body = await request.json();
		const result = schema.parse(body);
		return { success: true, data: result };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { success: false, errors: error };
		}
		throw error;
	}
}

// API handlers
export const handlers = [
	// GET all todo lists
	http.get('/api/todo-lists', async () => {
		await delay(getRandomDelay());

		if (shouldReturnError()) {
			return new HttpResponse(null, {
				status: 500,
				statusText: 'Internal Server Error',
			});
		}

		const todoLists = await getAllTodoLists();
		return HttpResponse.json(todoLists);
	}),

	// GET single todo list
	http.get('/api/todo-lists/:id', async ({ params }) => {
		await delay(getRandomDelay());

		if (shouldReturnError()) {
			return new HttpResponse(null, {
				status: 500,
				statusText: 'Internal Server Error',
			});
		}

		const id = params['id'] as string;
		const todoList = await getTodoList(id);

		if (!todoList) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list not found',
			});
		}

		return HttpResponse.json(todoList);
	}),

	// POST create new todo list
	http.post('/api/todo-lists', async ({ request }) => {
		await delay(getRandomDelay());

		if (shouldReturnError()) {
			return new HttpResponse(null, {
				status: 500,
				statusText: 'Internal Server Error',
			});
		}

		const validation = await validateRequestBody(request, todoListCreationPayloadSchema);

		if (!validation.success) {
			return HttpResponse.json(
				{
					message: 'Invalid todo list data',
					errors: validation.errors.format(),
				},
				{ status: 400 }
			);
		}

		const createdTodoList = await createTodoList(validation.data);
		return HttpResponse.json(createdTodoList, { status: 201 });
	}),

	// PUT update todo list
	http.put('/api/todo-lists/:id', async ({ params, request }) => {
		await delay(getRandomDelay());

		if (shouldReturnError()) {
			return new HttpResponse(null, {
				status: 500,
				statusText: 'Internal Server Error',
			});
		}

		const id = params['id'] as string;

		const validation = await validateRequestBody(request, todoListUpdatePayloadSchema);

		if (!validation.success) {
			return HttpResponse.json(
				{
					message: 'Invalid todo list data',
					errors: validation.errors.format(),
				},
				{ status: 400 }
			);
		}

		const updatedTodoList = await updateTodoList(id, validation.data);

		if (!updatedTodoList) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list not found',
			});
		}

		return HttpResponse.json(updatedTodoList);
	}),

	// DELETE todo list
	http.delete('/api/todo-lists/:id', async ({ params }) => {
		await delay(getRandomDelay());

		if (shouldReturnError()) {
			return new HttpResponse(null, {
				status: 500,
				statusText: 'Internal Server Error',
			});
		}

		const id = params['id'] as string;
		const deleted = await deleteTodoList(id);

		if (!deleted) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list not found',
			});
		}

		return new HttpResponse(null, { status: 204 });
	}),
];
