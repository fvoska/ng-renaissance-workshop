import { createTodoListItemForm } from '@/forms/todo-list-item.form';
import { TodoListForm } from '@/forms/todo-list.form';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { fadeAnimation, heightAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import { TodoListItemFormComponent } from '../todo-list-item-form/todo-list-item-form.component';
@Component({
	selector: 'arw-todo-list-form',
	imports: [
		ReactiveFormsModule,
		TodoListItemFormComponent,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
	],
	templateUrl: './todo-list-form.component.html',
	styleUrl: './todo-list-form.component.scss',
	animations: [fadeAnimation(), heightAnimation()],
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
