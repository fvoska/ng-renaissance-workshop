import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoListItemForm } from './todo-list-item.form';

export function createTodoListForm() {
	return new FormGroup({
		title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		description: new FormControl('', { nonNullable: true }),
		items: new FormArray<TodoListItemForm>([]),
	});
}

export type TodoListForm = ReturnType<typeof createTodoListForm>;
export type TodoListFormValue = TodoListForm['value'];
export type TodoListFormRawValue = ReturnType<TodoListForm['getRawValue']>;
