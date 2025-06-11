import { Component, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { fadeAnimation, heightAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import {
	createTodoListItemForm,
	TodoListItemForm,
	TodoListItemFormComponent,
} from '../todo-list-item-form/todo-list-item-form.component';
@Component({
	selector: 'arw-todo-list-form',
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		TodoListItemFormComponent,
	],
	templateUrl: './todo-list-form.component.html',
	styleUrl: './todo-list-form.component.scss',
	animations: [fadeAnimation(), heightAnimation()],
})
export class TodoListFormComponent {
	public readonly form = input.required<TodoListForm>();

	protected onAddItemClick() {
		this.form().controls.items.push(createTodoListItemForm());
	}

	protected onDeleteItemClick(index: number) {
		this.form().controls.items.removeAt(index);
	}
}

export function createTodoListForm() {
	return new FormGroup({
		title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		description: new FormControl('', { nonNullable: true }),
		items: new FormArray<TodoListItemForm>([]),
	});
}

export type TodoListForm = ReturnType<typeof createTodoListForm>;
