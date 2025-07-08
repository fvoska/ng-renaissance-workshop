import { TodoListsService } from '@/services/todo-lists.service';
import { TodoList } from '@/types/todo-list.type';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, switchMap } from 'rxjs';
import { TodoListEditDialogComponent } from '../todo-list-edit-dialog/todo-list-edit-dialog.component';

@Component({
	selector: 'arw-todo-lists-table',
	imports: [MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule, AsyncPipe],
	templateUrl: './todo-lists-table.component.html',
	styleUrl: './todo-lists-table.component.scss',
})
export class TodoListsTableComponent {
	protected readonly todoListsService = inject(TodoListsService);
	private readonly dialog = inject(MatDialog);

	protected readonly loadingTrigger$ = new BehaviorSubject(undefined);
	protected readonly isLoading$ = new BehaviorSubject(true);
	protected readonly error$ = new BehaviorSubject<unknown | null>(null);
	protected readonly todoLists$ = this.createTodoListsObservable();
	protected readonly displayedColumns = ['title', 'items', 'actions'];

	protected onDeleteClick(id: string) {
		this.todoListsService.delete(id).subscribe();
	}

	protected onEditClick(todoList: TodoList) {
		this.dialog.open(TodoListEditDialogComponent, {
			data: todoList,
			disableClose: true,
			closeOnNavigation: true,
		});
	}

	private createTodoListsObservable(): Observable<TodoList[]> {
		return this.loadingTrigger$.pipe(
			switchMap(() => {
				this.isLoading$.next(true);
				this.error$.next(null);

				return this.todoListsService.getAll().pipe(
					catchError(e => {
						this.error$.next(e);
						return EMPTY;
					}),
					finalize(() => {
						this.isLoading$.next(false);
					})
				);
			})
		);
	}
}
