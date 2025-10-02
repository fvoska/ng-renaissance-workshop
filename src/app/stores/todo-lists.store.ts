import { TodoListsService } from '@/services/todo-lists.service';
import { TodoList } from '@/types/todo-list.type';
import { inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { signalStore, withMethods, withProps } from '@ngrx/signals';

export const TodoListsStore = signalStore(
	{ providedIn: 'root' },
	withProps((_store, todoListsService = inject(TodoListsService)) => ({
		_todoLists: rxResource({
			defaultValue: [],
			stream: () => todoListsService.getAll(),
		}),
	})),
	withProps(store => ({
		todoLists: store._todoLists.asReadonly(),
	})),
	withMethods(store => ({
		reload: () => {
			store._todoLists.reload();
		},
		add: (newTodoList: TodoList) => {
			store._todoLists.update(currentTodoLists => {
				return [...currentTodoLists, newTodoList];
			});
		},
		delete: (idToDelete: string) => {
			store._todoLists.update(currentTodoLists => {
				return currentTodoLists.filter(({ id }) => id !== idToDelete);
			});
		},
	}))
);
