import { TodoList } from '@/types/todo-list.type';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';

export const TodoListsStore = signalStore(
	{ providedIn: 'root' },
	withEntities<TodoList & { id: string }>(),
	withMethods(store => ({
		setAll(todos: TodoList[]) {
			patchState(store, setAllEntities(todos));
		},
		add(todo: TodoList) {
			patchState(store, addEntity(todo));
		},
		remove(id: string) {
			patchState(store, removeEntity(id));
		},
	}))
);
