import { createTodoListForm } from '@/forms/todo-list.form';
import { TodoListService } from '@/services/todo-list.service';
import { TodoListsStore } from '@/stores/todo-lists.store';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { fadeAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import { finalize } from 'rxjs';
import { TodoListFormComponent } from '../todo-list-form/todo-list-form.component';

@Component({
	selector: 'arw-todo-list-create-dialog',
	imports: [TodoListFormComponent, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule],
	templateUrl: './todo-list-create-dialog.component.html',
	styleUrl: './todo-list-create-dialog.component.scss',
	animations: [fadeAnimation()],
})
export class TodoListCreateDialogComponent {
	protected readonly isLoading = signal(false);
	private readonly todoListsStore = inject(TodoListsStore);
	private readonly todoListService = inject(TodoListService);
	protected readonly form = createTodoListForm();
	protected readonly dialogRef = inject(MatDialogRef<typeof this>);
	private readonly destroyRef = inject(DestroyRef);

	protected onSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		this.form.disable();
		this.isLoading.set(true);

		this.todoListService
			.create(this.form.getRawValue())
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => {
					this.form.enable();
					this.isLoading.set(false);
				})
			)
			.subscribe(todoList => {
				this.todoListsStore.add(todoList);
				this.dialogRef.close();
			});
	}
}
