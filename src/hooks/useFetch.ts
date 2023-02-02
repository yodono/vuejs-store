import { ref, isRef, unref, watchEffect, Ref } from 'vue';
import api, { AxiosOptions } from '../utils/api';
import { useCache } from './useCache';

type useFetchOptions = {
	reqOptions?: AxiosOptions;
	cache?: boolean;
};

export function useFetch(url: string | Ref<string>, options?: useFetchOptions) {
	const data: Ref = ref(null);
	const error: Ref = ref(null);
	const loading: Ref = ref(true);

	const { cached } = options?.cache ? useCache(unref(url), data) : { cached: false };

	function doFetch() {
		if (cached) {
			loading.value = false;
			return;
		}

		// reset state before fetching..
		data.value = null;
		error.value = null;
		loading.value = true;

		// unref() unwraps potential refs
		api
			.get(unref(url), options?.reqOptions)
			.then((res) => {
				data.value = res;
			})
			.catch((err) => (error.value = err))
			.finally(() => (loading.value = false));
	}

	if (isRef(url)) {
		// setup reactive re-fetch if input URL is a ref
		watchEffect(doFetch);
	} else {
		// otherwise, just fetch once
		// and avoid the overhead of a watcher
		doFetch();
	}

	return { data, error, loading, retry: doFetch };
}
