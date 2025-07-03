import { createTodoListItemForm } from '@/forms/todo-list-item.form';
import { createTodoListForm } from '@/forms/todo-list.form';
import { TodoListsStore } from '@/stores/todo-lists.store';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { fadeAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import { TodoListFormComponent } from '../todo-list-form/todo-list-form.component';

export type TodoListEditDialogData = {
	id: string;
};

@Component({
	selector: 'arw-todo-list-edit-dialog',
	imports: [TodoListFormComponent, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule],
	templateUrl: './todo-list-edit-dialog.component.html',
	styleUrl: './todo-list-edit-dialog.component.scss',
	animations: [fadeAnimation()],
})
export class TodoListEditDialogComponent {
	private readonly dialogRef = inject(MatDialogRef);
	private readonly dialogData = inject<TodoListEditDialogData>(MAT_DIALOG_DATA);
	private readonly todoListsStore = inject(TodoListsStore);
	protected readonly form = this.createTodoListForm();

	protected async onSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		this.form.disable();

		try {
			await this.todoListsStore.update(this.dialogData.id, this.form.getRawValue());
			this.dialogRef.close();
		} finally {
			this.form.enable();
		}
	}

	private createTodoListForm() {
		const form = createTodoListForm();

		const todoList = this.todoListsStore.entityMap()[this.dialogData.id];

		if (!todoList) {
			console.error('Todo list not found', this.dialogData.id);
			return form;
		}

		form.reset(todoList);
		form.controls.items.reset();

		for (const item of todoList.items) {
			const itemForm = createTodoListItemForm();
			itemForm.reset(item);
			form.controls.items.push(itemForm);
		}

		return form;
	}
}
