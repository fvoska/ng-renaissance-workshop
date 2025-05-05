import { TodoListsService } from '@/services/todo-lists.service';
import { TodoList } from '@/types/todo-list.type';
import { inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { signalStore, withMethods, withProps } from '@ngrx/signals';

export const TodoListsStore = signalStore(
	{ providedIn: 'root' },
	withProps((_store, todoListsService = inject(TodoListsService)) => ({
		todosResource: rxResource({
			loader: () => todoListsService.getAll(),
			defaultValue: undefined,
		}),
	})),
	withMethods(store => ({
		reload() {
			store.todosResource.reload();
		},
		add(todo: TodoList) {
			store.todosResource.update(todos => [...(todos ?? []), todo]);
		},
		remove(id: string) {
			store.todosResource.update(todos => todos?.filter(todo => todo.id !== id));
		},
	}))
);
