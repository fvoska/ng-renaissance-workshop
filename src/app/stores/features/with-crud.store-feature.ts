import { inject, resource } from '@angular/core';
import { signalStoreFeature, withMethods, withProps } from '@ngrx/signals';
import { lastValueFrom, Observable } from 'rxjs';

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
	dataFetchingServiceClass: new () => IDataFetchingService<TEntity, TCreationPayload, TUpdatePayload>
) {
	return signalStoreFeature(
		withProps(
			(
				_store,
				dataFetchingService = inject<IDataFetchingService<TEntity, TCreationPayload, TUpdatePayload>>(
					dataFetchingServiceClass
				)
			) => ({
				_entities: resource({
					defaultValue: [] as TEntity[],
					loader: async () => {
						return lastValueFrom(dataFetchingService.getAll());
					},
				}),
			})
		),
		withProps(store => ({
			entities: store._entities.asReadonly(),
		})),
		withMethods(
			(
				store,
				dataFetchingService = inject<IDataFetchingService<TEntity, TCreationPayload, TUpdatePayload>>(
					dataFetchingServiceClass
				)
			) => ({
				add: async (todoList: TCreationPayload) => {
					const newEntity = await lastValueFrom(dataFetchingService.create(todoList));
					store._entities.update(entities => [...entities, newEntity]);
				},
				update: async (id: string, todoList: TUpdatePayload) => {
					const updatedEntity = await lastValueFrom(dataFetchingService.update(id, todoList));
					store._entities.update(entities => entities.map(entity => (entity.id === id ? updatedEntity : entity)));
				},
				delete: async (id: string) => {
					await lastValueFrom(dataFetchingService.delete(id));
					store._entities.update(entities => entities.filter(entity => entity.id !== id));
				},
				reload: () => {
					store._entities.reload();
				},
			})
		)
	);
}
