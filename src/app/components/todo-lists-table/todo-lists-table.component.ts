import { TodoListsStore } from '@/stores/todo-lists.store';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
	selector: 'arw-todo-lists-table',
	imports: [MatTableModule, MatIconModule],
	templateUrl: './todo-lists-table.component.html',
	styleUrl: './todo-lists-table.component.scss',
})
export class TodoListsTableComponent {
	protected readonly todoListsStore = inject(TodoListsStore);

	protected readonly displayedColumns = ['title', 'items', 'actions'];
}
