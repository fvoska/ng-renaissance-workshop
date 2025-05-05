import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValue, RawFormValue } from '@infinum/ngx-nuts-and-bolts/form-utils';
import { TodoListItemForm } from './todo-list-item.form';

export function createTodoListForm() {
	return new FormGroup({
		title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		description: new FormControl('', { nonNullable: true }),
		items: new FormArray<TodoListItemForm>([], { validators: [Validators.required] }),
	});
}

export type TodoListForm = ReturnType<typeof createTodoListForm>;
export type TodoListFormValue = FormValue<TodoListForm>;
export type TodoListRawFormValue = RawFormValue<TodoListForm>;
