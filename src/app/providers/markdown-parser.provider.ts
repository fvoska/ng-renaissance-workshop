import { InjectionToken, Provider } from '@angular/core';
import hljs from 'highlight.js';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

export const MARKDOWN_PARSER = new InjectionToken<Marked>('MARKDOWN_PARSER');

export function provideMarkdownParser(): Provider {
	return {
		provide: MARKDOWN_PARSER,
		useFactory: () => {
			hljs.registerLanguage('javascript', javascript);
			hljs.registerLanguage('typescript', typescript);
			hljs.registerLanguage('bash', bash);
			hljs.registerLanguage('html', html);

			return new Marked(
				markedHighlight({
					emptyLangClass: 'hljs',
					langPrefix: 'hljs language-',
					highlight: (code, lang) => {
						const language = hljs.getLanguage(lang) ? lang : 'plaintext';
						return hljs.highlight(code, { language }).value;
					},
				})
			);
		},
	};
}
