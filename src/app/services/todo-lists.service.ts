import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoList, TodoListCreationPayload, TodoListUpdatePayload } from '../types/todo-list.type';

@Injectable({
	providedIn: 'root',
})
export class TodoListsService {
	private readonly apiUrl = '/api/todo-lists';
	private readonly http = inject(HttpClient);

	getAll(): Observable<TodoList[]> {
		return this.http.get<TodoList[]>(this.apiUrl);
	}

	get(id: string): Observable<TodoList> {
		return this.http.get<TodoList>(`${this.apiUrl}/${id}`);
	}

	create(todoList: TodoListCreationPayload): Observable<TodoList> {
		return this.http.post<TodoList>(this.apiUrl, todoList);
	}

	update(id: string, todoList: TodoListUpdatePayload): Observable<TodoList> {
		return this.http.put<TodoList>(`${this.apiUrl}/${id}`, todoList);
	}

	delete(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
