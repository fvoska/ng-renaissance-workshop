import { TodoListService } from '@/services/todo-list.service';
import { TodoList } from '@/types/todo-list.type';
import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';

export const TodoListsStore = signalStore(
	{ providedIn: 'root' },
	withEntities<TodoList>(),
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
			todoListService.getTodoLists().subscribe(todos => {
				console.log(todos);
				patchState(store, setAllEntities(todos));
			});
		},
	}))
);
