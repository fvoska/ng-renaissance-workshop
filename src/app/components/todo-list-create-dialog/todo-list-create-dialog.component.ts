import { TodoListsService } from '@/services/todo-lists.service';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { fadeAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import { createTodoListForm } from '../todo-list-form/todo-list-form';
import { TodoListFormComponent } from '../todo-list-form/todo-list-form.component';

@Component({
	selector: 'arw-todo-list-create-dialog',
	imports: [TodoListFormComponent, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule],
	templateUrl: './todo-list-create-dialog.component.html',
	styleUrl: './todo-list-create-dialog.component.scss',
	animations: [fadeAnimation()],
})
export class TodoListCreateDialogComponent {
	protected readonly form = createTodoListForm();
	protected readonly isLoading = signal(false);

	private readonly dialogRef = inject(MatDialogRef);
	private readonly todoListsService = inject(TodoListsService);

	protected onSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		this.form.disable();
		this.isLoading.set(true);

		this.todoListsService.create(this.form.getRawValue()).subscribe({
			next: newTodoList => {
				this.dialogRef.close(newTodoList);
			},
			error: e => {
				this.form.enable();
				this.isLoading.set(false);
				throw e;
			},
		});
	}
}
