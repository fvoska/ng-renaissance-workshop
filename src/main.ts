import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { setupWorker } from 'msw/browser';
import { handlers } from './app/mocks/handlers';

setupWorker(...handlers)
	.start()
	.then(() => {
		bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
	})
	.catch(err => console.error(err));
