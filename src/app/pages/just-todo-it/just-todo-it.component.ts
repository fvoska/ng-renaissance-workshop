import { TodoListCreateDialogComponent } from '@/components/todo-list-create-dialog/todo-list-create-dialog.component';
import { TodoListsTableComponent } from '@/components/todo-lists-table/todo-lists-table.component';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'arw-just-todo-it',
	imports: [TodoListsTableComponent, MatButtonModule],
	templateUrl: './just-todo-it.component.html',
	styleUrl: './just-todo-it.component.scss',
})
export class JustTodoItComponent {
	private readonly dialog = inject(MatDialog);

	onAddClick() {
		this.dialog
			.open(TodoListCreateDialogComponent, {
				disableClose: true,
				closeOnNavigation: true,
			})
			.afterClosed()
			.subscribe(() => {
				//refresh the table
			});
	}
}
