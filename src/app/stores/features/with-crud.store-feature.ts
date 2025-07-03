import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { lastValueFrom, Observable } from 'rxjs';
import { withLoadingState } from './with-loading-state.store-feature';

type BaseEntity = {
	id: string;
};

export interface IDataFetchingService<
	TEntity extends BaseEntity,
	TCreationPayload extends object,
	TUpdatePayload extends object,
> {
	getAll(): Observable<TEntity[]>;
	create(payload: TCreationPayload): Observable<TEntity>;
	update(id: string, payload: TUpdatePayload): Observable<TEntity>;
	delete(id: string): Observable<void>;
}

export function withCrud<TEntity extends BaseEntity, TCreationPayload extends object, TUpdatePayload extends object>(
	dataFetchingServiceCtor: new () => IDataFetchingService<TEntity, TCreationPayload, TUpdatePayload>
) {
	return signalStoreFeature(
		withLoadingState(),
		withEntities<TEntity>(),
		withMethods(
			(
				store,
				dataFetchingService = inject<IDataFetchingService<TEntity, TCreationPayload, TUpdatePayload>>(
					dataFetchingServiceCtor
				)
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
				update: async (id: string, todoList: TUpdatePayload) => {
					const updatedEntity = await lastValueFrom(dataFetchingService.update(id, todoList));
					patchState(store, updateEntity({ id, changes: updatedEntity }));
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
