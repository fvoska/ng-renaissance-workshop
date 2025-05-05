import { createTodoListItemForm } from '@/forms/todo-list-item.form';
import { TodoListForm } from '@/forms/todo-list.form';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListItemFormComponent } from '../todo-list-item-form/todo-list-item-form.component';

@Component({
	selector: 'arw-todo-list-form',
	imports: [ReactiveFormsModule, TodoListItemFormComponent],
	templateUrl: './todo-list-form.component.html',
	styleUrl: './todo-list-form.component.scss',
	host: {
		'[formGroup]': 'form()',
	},
})
export class TodoListFormComponent {
	public readonly form = input.required<TodoListForm>();

	public onAddItemClick() {
		this.form().controls.items.push(createTodoListItemForm());
	}

	public onDeleteItemClick(index: number) {
		this.form().controls.items.removeAt(index);
	}
}
