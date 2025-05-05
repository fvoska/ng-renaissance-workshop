import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemFormComponent } from './todo-list-item-form.component';

describe('TodoListItemFormComponent', () => {
	let component: TodoListItemFormComponent;
	let fixture: ComponentFixture<TodoListItemFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TodoListItemFormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TodoListItemFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
