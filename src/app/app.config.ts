import { provideMarkdownParser } from '@/providers';
import { GlobalErrorHandler } from '@/services/global-error-handler';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(withFetch()),
		provideClientHydration(withEventReplay()),
		provideMarkdownParser(),
		provideAnimations(),
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler,
		},
	],
};
