import { createTodoListItemForm } from '@/forms/todo-list-item.form';
import { createTodoListForm, TodoListForm } from '@/forms/todo-list.form';
import { TodoListsService } from '@/services/todo-lists.service';
import { TodoListsStore } from '@/stores/todo-lists.store';
import { TodoList, TodoListUpdatePayload } from '@/types/todo-list.type';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { fadeAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import { finalize } from 'rxjs';
import { TodoListFormComponent } from '../todo-list-form/todo-list-form.component';

@Component({
	selector: 'arw-todo-list-edit-dialog',
	imports: [TodoListFormComponent, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule],
	templateUrl: './todo-list-edit-dialog.component.html',
	styleUrl: './todo-list-edit-dialog.component.scss',
	animations: [fadeAnimation()],
})
export class TodoListEditDialogComponent implements OnInit {
	protected readonly isLoading = signal(false);
	private readonly todoListsStore = inject(TodoListsStore);
	private readonly todoListsService = inject(TodoListsService);
	protected readonly form: TodoListForm = createTodoListForm();
	protected readonly dialogRef = inject(MatDialogRef<TodoListEditDialogComponent>);
	private readonly destroyRef = inject(DestroyRef);
	private readonly todoList = inject<TodoList>(MAT_DIALOG_DATA);

	ngOnInit(): void {
		this.form.patchValue({
			title: this.todoList.title,
			description: this.todoList.description,
		});
		this.todoList.items.forEach(item => {
			const itemForm = createTodoListItemForm();
			itemForm.patchValue(item);
			this.form.controls.items.push(itemForm);
		});
	}

	protected onSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		this.form.disable();
		this.isLoading.set(true);

		const formValue = this.form.getRawValue();
		const payload: TodoListUpdatePayload = {
			id: this.todoList.id,
			title: formValue.title,
			description: formValue.description,
			items: formValue.items.map(item => ({
				...item,
				id: item.id || undefined,
			})),
		};

		this.todoListsService
			.update(this.todoList.id, payload)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => {
					this.form.enable();
					this.isLoading.set(false);
				})
			)
			.subscribe(updatedTodoList => {
				this.todoListsStore.update(updatedTodoList);
				this.dialogRef.close();
			});
	}
}
