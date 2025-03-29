import { MARKDOWN_PARSER } from '@/app/providers';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';

@Component({
	selector: 'arw-welcome',
	templateUrl: './welcome.component.html',
	styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
	private readonly markdownParser = inject(MARKDOWN_PARSER);
	protected readonly markdownContent = httpResource.text('./README.md');
	protected readonly parsedContent = computed(() => this.markdownParser.parse(this.markdownContent.value() ?? ''));
}
