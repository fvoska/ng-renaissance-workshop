import { TodoListsService } from '@/services/todo-lists.service';
import { TodoList, TodoListCreationPayload } from '@/types/todo-list.type';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TodoListState = {
	todoLists: TodoList[];
	loading: boolean;
	error: Error | null;
};

const initialState: TodoListState = {
	todoLists: [],
	loading: false,
	error: null,
};

export const TodoListsStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed(store => ({
		doneTodoLists: computed(() => store.todoLists().filter(todoList => todoList.items.every(item => item.completed))),
	})),
	withComputed(store => ({
		doneTodoListsCount: computed(() => store.doneTodoLists().length),
	})),
	withMethods((store, todoListsService = inject(TodoListsService)) => ({
		loadTodoLists: () => {
			patchState(store, { loading: true });
			todoListsService.getAll().subscribe(
				todoLists => {
					patchState(store, { todoLists, loading: false });
				},
				error => {
					patchState(store, { error, loading: false });
				}
			);
		},
		addTodoList: async (todoList: TodoListCreationPayload) => {
			const newTodoList = await lastValueFrom(todoListsService.create(todoList));
			patchState(store, {
				todoLists: [...store.todoLists(), newTodoList],
			});
		},
		deleteTodoList: (id: string) => {
			todoListsService.delete(id).subscribe(() => {
				patchState(store, {
					todoLists: store.todoLists().filter(todoList => todoList.id !== id),
				});
			});
		},
	})),
	withMethods((store, todoListsService = inject(TodoListsService)) => ({
		loadTodoLists: () => {
			patchState(store, { loading: true });
			todoListsService.getAll().subscribe(
				todoLists => {
					patchState(store, { todoLists, loading: false });
				},
				error => {
					patchState(store, { error, loading: false });
				}
			);
		},
	})),
	withHooks(store => ({
		onInit: () => {
			store.loadTodoLists();
		},
	}))
);
