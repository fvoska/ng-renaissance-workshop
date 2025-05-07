import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { fadeAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
import { TodoListFormComponent } from '../todo-list-form/todo-list-form.component';

@Component({
	selector: 'arw-todo-list-edit-dialog',
	imports: [TodoListFormComponent, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule],
	templateUrl: './todo-list-edit-dialog.component.html',
	styleUrl: './todo-list-edit-dialog.component.scss',
	animations: [fadeAnimation()],
})
export class TodoListEditDialogComponent {}
