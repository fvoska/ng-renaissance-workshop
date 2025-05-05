import { TodoListService } from '@/services/todo-list.service';
import { TodoListsStore } from '@/stores/todo-lists.store';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

@Component({
	selector: 'arw-todo-lists-table',
	imports: [MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
	templateUrl: './todo-lists-table.component.html',
	styleUrl: './todo-lists-table.component.scss',
	animations: [],
})
export class TodoListsTableComponent {
	protected readonly deletingRecord = signal<Partial<Record<string, boolean>>>({});
	protected readonly todoListsStore = inject(TodoListsStore);
	protected readonly todoListService = inject(TodoListService);
	protected readonly displayedColumns = ['title', 'items', 'actions'];

	protected onDeleteClick(id: string) {
		this.deletingRecord.set({
			[id]: true,
		});

		this.todoListService.delete(id).subscribe(() => {
			this.todoListsStore.remove(id);
			this.deletingRecord.set({
				[id]: false,
			});
		});
	}

	protected onEditClick(id: string) {
		console.log(id);
	}
}
