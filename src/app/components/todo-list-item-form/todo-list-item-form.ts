import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createTodoListItemForm() {
	return new FormGroup({
		completed: new FormControl(false, { nonNullable: true }),
		text: new FormControl('', { validators: [Validators.required], nonNullable: true }),
	});
}

export type TodoListItemForm = ReturnType<typeof createTodoListItemForm>;
export type TodoListItemFormValue = TodoListItemForm['value'];
export type TodoListItemFormRawValue = ReturnType<TodoListItemForm['getRawValue']>;
