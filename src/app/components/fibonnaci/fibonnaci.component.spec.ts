import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibonnaciComponent } from './fibonnaci.component';

describe('FibonnaciComponent', () => {
	let component: FibonnaciComponent;
	let fixture: ComponentFixture<FibonnaciComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FibonnaciComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FibonnaciComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
