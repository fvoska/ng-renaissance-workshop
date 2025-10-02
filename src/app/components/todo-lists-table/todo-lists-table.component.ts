import { TodoListsService } from '@/services/todo-lists.service';
import { TodoListsStore } from '@/stores/todo-lists.store';
import { TodoList } from '@/types/todo-list.type';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { TodoListEditDialogComponent } from '../todo-list-edit-dialog/todo-list-edit-dialog.component';

@Component({
	selector: 'arw-todo-lists-table',
	imports: [MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule, JsonPipe],
	templateUrl: './todo-lists-table.component.html',
	styleUrl: './todo-lists-table.component.scss',
})
export class TodoListsTableComponent {
	protected readonly todoListsService = inject(TodoListsService);
	private readonly dialog = inject(MatDialog);

	public readonly todoListsStore = inject(TodoListsStore);
	protected readonly displayedColumns = ['title', 'items', 'actions'];

	protected onDeleteClick(id: string) {
		this.todoListsService.delete(id).subscribe(() => {
			this.todoListsStore.delete(id);
		});
	}

	protected onEditClick(todoList: TodoList) {
		this.dialog.open(TodoListEditDialogComponent, {
			data: todoList,
			disableClose: true,
			closeOnNavigation: true,
		});
	}
}
