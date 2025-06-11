import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@Component({
	selector: 'arw-todo-list-item-form',
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatIconModule],
	templateUrl: './todo-list-item-form.component.html',
	styleUrl: './todo-list-item-form.component.scss',
})
export class TodoListItemFormComponent {
	public readonly form = input.required<TodoListItemForm>();
	public readonly delete = output<void>();

	public onDeleteClick() {
		this.delete.emit();
	}
}

export function createTodoListItemForm() {
	return new FormGroup({
		completed: new FormControl(false, { nonNullable: true }),
		text: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
	});
}

export type TodoListItemForm = ReturnType<typeof createTodoListItemForm>;
export type TodoListItemFormValue = TodoListItemForm['value'];
