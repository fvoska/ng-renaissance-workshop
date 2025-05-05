import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustTodoItComponent } from './just-todo-it.component';

describe('IndexComponent', () => {
	let component: JustTodoItComponent;
	let fixture: ComponentFixture<JustTodoItComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [JustTodoItComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(JustTodoItComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
