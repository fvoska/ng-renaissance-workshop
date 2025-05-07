import { Component, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@Component({
	selector: 'arw-todo-list-item-form',
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatIconModule],
	templateUrl: './todo-list-item-form.component.html',
	styleUrl: './todo-list-item-form.component.scss',
})
export class TodoListItemFormComponent {
	public readonly delete = output<void>();

	public onDeleteClick() {
		this.delete.emit();
	}
}
