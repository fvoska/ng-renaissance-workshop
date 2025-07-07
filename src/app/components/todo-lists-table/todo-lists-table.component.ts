import { TodoListsStore } from '@/stores/todo-lists.store';
import { TodoList } from '@/types/todo-list.type';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { TodoListEditDialogComponent } from '../todo-list-edit-dialog/todo-list-edit-dialog.component';

@Component({
	selector: 'arw-todo-lists-table',
	imports: [MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule],
	templateUrl: './todo-lists-table.component.html',
	styleUrl: './todo-lists-table.component.scss',
})
export class TodoListsTableComponent {
	protected readonly todoListsStore = inject(TodoListsStore);
	protected readonly deletingIds = signal<Record<string, boolean>>({});

	private readonly dialog = inject(MatDialog);
	protected readonly displayedColumns = ['title', 'items', 'actions'];

	protected onRetry() {
		this.todoListsStore.reload();
	}

	protected async onDeleteClick(id: string) {
		this.deletingIds.update(ids => ({ ...ids, [id]: true }));

		try {
			await this.todoListsStore.delete(id);
		} finally {
			this.deletingIds.update(ids => {
				const newIds = { ...ids };
				delete newIds[id];
				return newIds;
			});
		}
	}

	protected onEditClick(todoList: TodoList) {
		this.dialog.open(TodoListEditDialogComponent, {
			data: todoList,
			disableClose: true,
			closeOnNavigation: true,
		});
	}
}
