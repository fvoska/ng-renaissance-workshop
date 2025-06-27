import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { lastValueFrom, Observable } from 'rxjs';
import { withLoadingState } from './with-loading-state.store-feature';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type BaseEntity = {
	id: string;
};

export interface IDataFetchingService<TEntity extends BaseEntity, TCreationPayload> {
	getAll(): Observable<TEntity[]>;
	create(payload: TCreationPayload): Observable<TEntity>;
	delete(id: string): Observable<void>;
}

export function withCrud<TEntity extends BaseEntity, TCreationPayload>(
	dataFetchingServiceCtor: new () => IDataFetchingService<TEntity, TCreationPayload>
) {
	return signalStoreFeature(
		withLoadingState(),
		withEntities<TEntity>(),
		withMethods(
			(
				store,
				dataFetchingService = inject<IDataFetchingService<TEntity, TCreationPayload>>(dataFetchingServiceCtor)
			) => ({
				loadAll: () => {
					patchState(store, { loading: true });
					dataFetchingService.getAll().subscribe(
						entities => {
							patchState(store, setAllEntities(entities), { loading: false });
						},
						error => {
							patchState(store, { error, loading: false });
						}
					);
				},
				add: async (todoList: TCreationPayload) => {
					const newEntity = await lastValueFrom(dataFetchingService.create(todoList));
					patchState(store, addEntity(newEntity));
				},
				delete: (id: string) => {
					dataFetchingService.delete(id).subscribe(() => {
						patchState(store, removeEntity(id));
					});
				},
			})
		)
	);
}
