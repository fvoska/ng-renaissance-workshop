import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListItem } from '../types/todo-list-item.type';
import { TodoList, TodoListCreate } from '../types/todo-list.type';

@Injectable({
	providedIn: 'root',
})
export class TodoListService {
	private apiUrl = '/api/todo-lists';

	constructor(private http: HttpClient) {}

	// Get all todo lists with pagination, filtering, and sorting
	getTodoLists(): Observable<TodoList[]> {
		return this.http.get<TodoList[]>(this.apiUrl);
	}

	// Get a single todo list by ID
	getTodoList(id: string): Observable<TodoList> {
		return this.http.get<TodoList>(`${this.apiUrl}/${id}`);
	}

	// Create a new todo list
	createTodoList(todoList: TodoListCreate): Observable<TodoList> {
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
