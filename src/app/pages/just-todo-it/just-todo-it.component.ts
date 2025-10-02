import { FibonnaciComponent } from '@/components/fibonnaci/fibonnaci.component';
import { TodoListCreateDialogComponent } from '@/components/todo-list-create-dialog/todo-list-create-dialog.component';
import { TodoListsTableComponent } from '@/components/todo-lists-table/todo-lists-table.component';
import { TodoList } from '@/types/todo-list.type';
import { Component, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'arw-just-todo-it',
	imports: [TodoListsTableComponent, MatButtonModule, FibonnaciComponent],
	templateUrl: './just-todo-it.component.html',
	styleUrl: './just-todo-it.component.scss',
})
export class JustTodoItComponent {
	private readonly dialog = inject(MatDialog);
	private readonly tableComponentRef = viewChild(TodoListsTableComponent);

	protected onAddClick() {
		this.dialog
			.open<TodoListCreateDialogComponent, never, undefined | TodoList>(TodoListCreateDialogComponent, {
				disableClose: true,
				closeOnNavigation: true,
			})
			.afterClosed()
			.subscribe(closeResult => {
				if (!closeResult) {
					return;
				}

				this.tableComponentRef()?.todoListsStore.reload();
			});
	}
}
