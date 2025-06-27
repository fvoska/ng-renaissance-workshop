import { signalStoreFeature, withState } from '@ngrx/signals';

export function withLoadingState<TError extends Error = Error>() {
	return signalStoreFeature(withState({ loading: false, error: null } as { loading: boolean; error: TError | null }));
}
