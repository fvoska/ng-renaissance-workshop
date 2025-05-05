import { TodoListsTableComponent } from '@/components/todo-lists-table/todo-lists-table.component';
import { Component } from '@angular/core';

@Component({
	selector: 'arw-index',
	imports: [TodoListsTableComponent],
	templateUrl: './index.component.html',
	styleUrl: './index.component.scss',
})
export class IndexComponent {}
