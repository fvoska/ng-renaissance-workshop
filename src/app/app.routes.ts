import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent),
	},
	{
		path: 'welcome',
		loadComponent: () => import('./pages/welcome/welcome.component').then(m => m.WelcomeComponent),
	},
];
