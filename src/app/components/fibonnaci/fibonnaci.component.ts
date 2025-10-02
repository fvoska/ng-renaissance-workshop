import { Component, computed, input, untracked } from '@angular/core';

@Component({
	selector: 'arw-fibonnaci',
	templateUrl: './fibonnaci.component.html',
	styleUrl: './fibonnaci.component.scss',
})
export class FibonnaciComponent {
	public readonly limit = input.required<number>();
	public readonly result = computed(() => {
		// Read all the signals we depend on
		const limit = this.limit();

		// Do something with values of those signals
		return untracked(() => {
			return calculateFib(limit);
		});
	});
}

function calculateFib(limit: number) {
	const sequence = [0, 1];
	for (let i = 2; i < limit; i++) {
		sequence.push(sequence[i - 1] + sequence[i - 2]);
	}
	return sequence;
}
