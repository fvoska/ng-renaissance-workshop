import { TodoListItemForm } from '@/forms/todo-list-item.form';
import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
	selector: 'arw-todo-list-item-form',
	imports: [ReactiveFormsModule],
	templateUrl: './todo-list-item-form.component.html',
	styleUrl: './todo-list-item-form.component.scss',
	host: {
		'[formGroup]': 'form()',
	},
})
export class TodoListItemFormComponent {
	public readonly form = input.required<TodoListItemForm>();
	public readonly delete = output<void>();

	public onCheckboxChange(event: Event) {
		const checkbox = event.target as HTMLInputElement;
		this.form().controls.completed.setValue(checkbox.checked);
	}

	public onDeleteClick() {
		this.delete.emit();
	}
}
