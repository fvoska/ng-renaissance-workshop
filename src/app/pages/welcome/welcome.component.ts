import { MARKDOWN_PARSER } from '@/providers';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'arw-welcome',
	templateUrl: './welcome.component.html',
	styleUrl: './welcome.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class WelcomeComponent {
	private readonly markdownParser = inject(MARKDOWN_PARSER);
	protected readonly markdownContent = httpResource.text(() => './README.md');
	protected readonly parsedContent = computed(() => this.markdownParser.parse(this.markdownContent.value() ?? ''));
}
