import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListCreateDialogComponent } from './todo-list-create-dialog.component';

describe('TodoListCreateDialogComponent', () => {
	let component: TodoListCreateDialogComponent;
	let fixture: ComponentFixture<TodoListCreateDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TodoListCreateDialogComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TodoListCreateDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
