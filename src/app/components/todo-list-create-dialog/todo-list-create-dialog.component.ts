import { TodoListsStore } from '@/stores/todo-lists.store';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { fadeAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import { createTodoListForm, TodoListFormComponent } from '../todo-list-form/todo-list-form.component';

@Component({
	selector: 'arw-todo-list-create-dialog',
	imports: [TodoListFormComponent, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule],
	templateUrl: './todo-list-create-dialog.component.html',
	styleUrl: './todo-list-create-dialog.component.scss',
	animations: [fadeAnimation()],
})
export class TodoListCreateDialogComponent {
	private readonly dialogRef = inject(MatDialogRef);
	private readonly todoListsStore = inject(TodoListsStore);
	protected readonly form = createTodoListForm();

	protected async onSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		await this.todoListsStore.addTodoList(this.form.getRawValue());

		this.dialogRef.close();
	}
}
