import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { fadeAnimation, heightAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import { createTodoListItemForm } from '../todo-list-item-form/todo-list-item-form';
import { TodoListItemFormComponent } from '../todo-list-item-form/todo-list-item-form.component';
import { TodoListForm } from './todo-list-form';

@Component({
	selector: 'arw-todo-list-form',
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		JsonPipe,
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
