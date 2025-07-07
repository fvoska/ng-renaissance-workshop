import { TodoListsService } from '@/services/todo-lists.service';
import { computed } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { withCrud } from './features/with-crud.store-feature';

export const TodoListsStore = signalStore(
	{ providedIn: 'root' },
	withCrud(TodoListsService),
	withComputed(store => ({
		doneTodoLists: computed(() =>
			store.entities.value().filter(todoList => todoList.items.every(item => item.completed))
		),
	})),
	withComputed(store => ({
		doneTodoListsCount: computed(() => store.doneTodoLists().length),
	}))
);
