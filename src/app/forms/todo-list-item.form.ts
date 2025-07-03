import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createTodoListItemForm() {
	return new FormGroup({
		id: new FormControl<string | undefined>(undefined, { nonNullable: true }),
		completed: new FormControl(false, { nonNullable: true }),
		text: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
	});
}

export type TodoListItemForm = ReturnType<typeof createTodoListItemForm>;
export type TodoListItemFormValue = TodoListItemForm['value'];
export type TodoListItemFormRawValue = ReturnType<TodoListItemForm['getRawValue']>;
