import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse, TodoListQueryParams } from '../types/query-params.type';
import { TodoListItem } from '../types/todo-list-item.type';
import { TodoList } from '../types/todo-list.type';

@Injectable({
	providedIn: 'root',
})
export class TodoListService {
	private apiUrl = '/api/todo-lists';

	constructor(private http: HttpClient) {}

	// Get all todo lists with pagination, filtering, and sorting
	getTodoLists(params: Partial<TodoListQueryParams> = {}): Observable<PaginatedResponse<TodoList>> {
		let httpParams = new HttpParams();

		// Add pagination params
		if (params.page) {
			httpParams = httpParams.set('page', params.page.toString());
		}
		if (params.limit) {
			httpParams = httpParams.set('limit', params.limit.toString());
		}

		// Add sorting params
		if (params.sortBy) {
			httpParams = httpParams.set('sortBy', params.sortBy);
		}
		if (params.direction) {
			httpParams = httpParams.set('direction', params.direction);
		}

		// Add filtering params
		if (params.title) {
			httpParams = httpParams.set('title', params.title);
		}
		if (params.description) {
			httpParams = httpParams.set('description', params.description);
		}
		if (params.hasCompletedItems !== undefined) {
			httpParams = httpParams.set('hasCompletedItems', params.hasCompletedItems.toString());
		}

		return this.http.get<PaginatedResponse<TodoList>>(this.apiUrl, { params: httpParams });
	}

	// Get a single todo list by ID
	getTodoList(id: string): Observable<TodoList> {
		return this.http.get<TodoList>(`${this.apiUrl}/${id}`);
	}

	// Create a new todo list
	createTodoList(todoList: Omit<TodoList, 'id'>): Observable<TodoList> {
		return this.http.post<TodoList>(this.apiUrl, todoList);
	}

	// Update a todo list
	updateTodoList(id: string, todoList: TodoList): Observable<TodoList> {
		return this.http.put<TodoList>(`${this.apiUrl}/${id}`, todoList);
	}

	// Delete a todo list
	deleteTodoList(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}

	// Add a new item to a todo list
	addTodoListItem(listId: string, item: Omit<TodoListItem, 'id'>): Observable<TodoListItem> {
		return this.http.post<TodoListItem>(`${this.apiUrl}/${listId}/items`, item);
	}

	// Update a todo list item
	updateTodoListItem(listId: string, itemId: string, updates: Partial<TodoListItem>): Observable<TodoListItem> {
		return this.http.patch<TodoListItem>(`${this.apiUrl}/${listId}/items/${itemId}`, updates);
	}

	// Delete a todo list item
	deleteTodoListItem(listId: string, itemId: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${listId}/items/${itemId}`);
	}

	// Get a specific todo list item
	getTodoListItem(listId: string, itemId: string): Observable<TodoListItem> {
		return this.http.get<TodoListItem>(`${this.apiUrl}/${listId}/items/${itemId}`);
	}
}
