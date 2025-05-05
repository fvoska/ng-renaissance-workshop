import { IDBPDatabase, openDB } from 'idb';
import { delay, http, HttpResponse } from 'msw';
import { z } from 'zod';
import { TodoListItem, todoListItemSchema } from '../types/todo-list-item.type';
import { TodoList, todoListCreateSchema, todoListSchema } from '../types/todo-list.type';

// Database setup
const DB_NAME = 'todo-app-db';
const TODO_LISTS_STORE = 'todoLists';
const DB_VERSION = 1;

// Random delay configuration
const MIN_DELAY_MS = 50;
const MAX_DELAY_MS = 800;

// Helper function to generate a random delay
function getRandomDelay(): number {
	return Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;
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

async function createTodoList(todoList: TodoList): Promise<TodoList> {
	const db = await getDb();
	await db.put(TODO_LISTS_STORE, todoList);
	return todoList;
}

async function updateTodoList(id: string, todoList: TodoList): Promise<TodoList | null> {
	const db = await getDb();
	const existingTodoList = await db.get(TODO_LISTS_STORE, id);

	if (!existingTodoList) {
		return null;
	}

	const updatedTodoList = { ...todoList, id };
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

// Find an item in a todo list by its ID
function findItemById(todoList: TodoList, itemId: string): { item: TodoListItem; index: number } | null {
	const index = todoList.items.findIndex(item => item.id === itemId);
	if (index === -1) {
		return null;
	}

	return { item: todoList.items[index], index };
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
		const todoLists = await getAllTodoLists();
		return HttpResponse.json(todoLists);
	}),

	// GET single todo list
	http.get('/api/todo-lists/:id', async ({ params }) => {
		await delay(getRandomDelay());
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

		const validation = await validateRequestBody(request, todoListCreateSchema);

		if (!validation.success) {
			return HttpResponse.json(
				{
					message: 'Invalid todo list data',
					errors: validation.errors.format(),
				},
				{ status: 400 }
			);
		}

		const { items, ...todoListData } = validation.data;

		const todoList: TodoList = {
			id: crypto.randomUUID(),
			...todoListData,
			items: items.map(item => ({
				...item,
				id: crypto.randomUUID(),
			})),
		};

		const createdTodoList = await createTodoList(todoList);
		return HttpResponse.json(createdTodoList, { status: 201 });
	}),

	// PUT update todo list
	http.put('/api/todo-lists/:id', async ({ params, request }) => {
		await delay(getRandomDelay());
		const id = params['id'] as string;

		const validation = await validateRequestBody(request, todoListSchema);

		if (!validation.success) {
			return HttpResponse.json(
				{
					message: 'Invalid todo list data',
					errors: validation.errors.format(),
				},
				{ status: 400 }
			);
		}

		const todoList = validation.data;

		// Ensure each item has an ID
		todoList.items = todoList.items.map(item => ({
			...item,
			id: item.id || crypto.randomUUID(),
		}));

		const updatedTodoList = await updateTodoList(id, todoList);

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

	// PATCH todo list item (for completing/uncompleting)
	http.patch('/api/todo-lists/:listId/items/:itemId', async ({ params, request }) => {
		await delay(getRandomDelay());
		const listId = params['listId'] as string;
		const itemId = params['itemId'] as string;

		const todoList = await getTodoList(listId);

		if (!todoList) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list not found',
			});
		}

		const itemInfo = findItemById(todoList, itemId);

		if (!itemInfo) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list item not found',
			});
		}

		const validation = await validateRequestBody(request, todoListItemSchema.partial());

		if (!validation.success) {
			return HttpResponse.json(
				{
					message: 'Invalid todo list item data',
					errors: validation.errors.format(),
				},
				{ status: 400 }
			);
		}

		const updates = validation.data;

		// Update the specific item
		todoList.items[itemInfo.index] = {
			...todoList.items[itemInfo.index],
			...updates,
			id: itemId, // Ensure ID is preserved
		};

		// Save back to DB
		await updateTodoList(listId, todoList);

		return HttpResponse.json(todoList.items[itemInfo.index]);
	}),

	// POST add new item to todo list
	http.post('/api/todo-lists/:listId/items', async ({ params, request }) => {
		await delay(getRandomDelay());
		const listId = params['listId'] as string;

		// Use a modified schema that makes id optional
		const todoListItemSchemaWithOptionalId = todoListItemSchema.extend({
			id: z.string().optional(),
		});

		const validation = await validateRequestBody(request, todoListItemSchemaWithOptionalId);

		if (!validation.success) {
			return HttpResponse.json(
				{
					message: 'Invalid todo list item data',
					errors: validation.errors.format(),
				},
				{ status: 400 }
			);
		}

		const itemData = validation.data;

		const todoList = await getTodoList(listId);

		if (!todoList) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list not found',
			});
		}

		// Add the new item with a generated ID if not provided
		const newItem: TodoListItem = {
			...itemData,
			id: itemData.id ?? crypto.randomUUID(),
		};

		todoList.items.push(newItem);

		// Save back to DB
		await updateTodoList(listId, todoList);

		return HttpResponse.json(newItem, { status: 201 });
	}),

	// DELETE item from todo list
	http.delete('/api/todo-lists/:listId/items/:itemId', async ({ params }) => {
		await delay(getRandomDelay());
		const listId = params['listId'] as string;
		const itemId = params['itemId'] as string;

		const todoList = await getTodoList(listId);

		if (!todoList) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list not found',
			});
		}

		const itemInfo = findItemById(todoList, itemId);

		if (!itemInfo) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list item not found',
			});
		}

		// Remove the item
		todoList.items.splice(itemInfo.index, 1);

		// Save back to DB
		await updateTodoList(listId, todoList);

		return new HttpResponse(null, { status: 204 });
	}),

	// GET a specific item from a todo list
	http.get('/api/todo-lists/:listId/items/:itemId', async ({ params }) => {
		await delay(getRandomDelay());
		const listId = params['listId'] as string;
		const itemId = params['itemId'] as string;

		const todoList = await getTodoList(listId);

		if (!todoList) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list not found',
			});
		}

		const itemInfo = findItemById(todoList, itemId);

		if (!itemInfo) {
			return new HttpResponse(null, {
				status: 404,
				statusText: 'Todo list item not found',
			});
		}

		return HttpResponse.json(itemInfo.item);
	}),
];
