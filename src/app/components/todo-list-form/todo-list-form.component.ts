import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { fadeAnimation, heightAnimation } from '@infinum/ngx-nuts-and-bolts/animations';
@Component({
	selector: 'arw-todo-list-form',
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule],
	templateUrl: './todo-list-form.component.html',
	styleUrl: './todo-list-form.component.scss',
	animations: [fadeAnimation(), heightAnimation()],
})
export class TodoListFormComponent {}
