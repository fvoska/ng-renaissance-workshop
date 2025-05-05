import { TodoListService } from '@/services/todo-list.service';
import { TodoList } from '@/types/todo-list.type';
import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';

export const TodoListsStore = signalStore(
	{ providedIn: 'root' },
	withState({
		isLoading: true,
	}),
	withEntities<TodoList & { id: string }>(),
	withMethods(store => ({
		add(todo: TodoList) {
			patchState(store, addEntity(todo));
		},
		remove(id: string) {
			patchState(store, removeEntity(id));
		},
	})),
	withHooks((store, todoListService = inject(TodoListService)) => ({
		onInit: () => {
			todoListService.getAll().subscribe(todos => {
				patchState(store, setAllEntities(todos), { isLoading: false });
			});
		},
	}))
);
