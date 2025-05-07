import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	private readonly snackBar = inject(MatSnackBar);

	handleError(error: unknown) {
		if (error instanceof HttpErrorResponse) {
			this.snackBar.open(error.message, 'Close', {
				duration: 5000,
				verticalPosition: 'top',
				horizontalPosition: 'center',
				panelClass: 'error',
			});
		} else {
			console.error(error);
		}
	}
}
