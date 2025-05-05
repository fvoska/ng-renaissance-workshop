import { TodoListsService } from '@/services/todo-lists.service';
import { TodoListsStore } from '@/stores/todo-lists.store';
import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
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
	protected readonly todosResource = rxResource({
		loader: () => this.todoListsService.getAll(),
		defaultValue: undefined,
	});

	constructor() {
		effect(() => {
			const todos = this.todosResource.value();

			if (todos) {
				this.todoListsStore.setAll(todos);
			}
		});

		this.todosResource.reload();
	}

	protected readonly deletingRecord = signal<Partial<Record<string, boolean>>>({});
	protected readonly todoListsStore = inject(TodoListsStore);
	protected readonly todoListsService = inject(TodoListsService);
	protected readonly displayedColumns = ['title', 'items', 'actions'];

	protected onDeleteClick(id: string) {
		this.deletingRecord.set({
			[id]: true,
		});

		this.todoListsService.delete(id).subscribe(() => {
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
