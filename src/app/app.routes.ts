import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'welcome',
		pathMatch: 'full',
	},
	{
		path: 'welcome',
		loadComponent: () => import('./pages/welcome/welcome.component').then(m => m.WelcomeComponent),
	},
	{
		path: 'just-todo-it',
		loadComponent: () => import('./pages/just-todo-it/just-todo-it.component').then(m => m.JustTodoItComponent),
	},
];
