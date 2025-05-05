import { TodoListCreateDialogComponent } from '@/components/todo-list-create-dialog/todo-list-create-dialog.component';
import { TodoListsTableComponent } from '@/components/todo-lists-table/todo-lists-table.component';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'arw-index',
	imports: [TodoListsTableComponent, MatButtonModule],
	templateUrl: './index.component.html',
	styleUrl: './index.component.scss',
})
export class IndexComponent {
	private readonly dialog = inject(MatDialog);

	onAddClick() {
		this.dialog
			.open(TodoListCreateDialogComponent)
			.afterClosed()
			.subscribe(result => {
				console.log(result);
			});
	}
}
