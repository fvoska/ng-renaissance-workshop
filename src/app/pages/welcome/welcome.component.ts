import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { parse } from 'marked';

@Component({
	selector: 'arw-welcome',
	templateUrl: './welcome.component.html',
	styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
	protected readonly markdownContent = httpResource.text('./README.md');
	protected readonly parsedContent = computed(() => parse(this.markdownContent.value() ?? ''));
}
