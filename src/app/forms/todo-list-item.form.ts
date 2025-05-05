import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValue, RawFormValue } from '@infinum/ngx-nuts-and-bolts/form-utils';

export function createTodoListItemForm() {
	return new FormGroup({
		text: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		completed: new FormControl(false, { nonNullable: true }),
	});
}

export type TodoListItemForm = ReturnType<typeof createTodoListItemForm>;
export type TodoListItemFormValue = FormValue<TodoListItemForm>;
export type TodoListItemRawFormValue = RawFormValue<TodoListItemForm>;
