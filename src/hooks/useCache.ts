import { watch, ref, Ref } from 'vue';

export function useCache(url: string, dataRef: Ref) {
	const requestDate = Date.now();
	const cached: Ref = ref(false);

	function getCache() {
		return JSON.parse(localStorage.getItem(url) || '{}');
	}

	function setCache(data: object) {
		const fiveDaysFromNow = Date.parse(
			new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toString()
		);

		localStorage.setItem(
			url,
			JSON.stringify({
				expiry: fiveDaysFromNow,
				data
			})
		);
	}

	const fetch = (refetch = false) => {
		const { expiry, data } = getCache();

		if (!refetch && expiry > requestDate) {
			dataRef.value = data;
			cached.value = true;
			console.log('fetched cached data for: ' + url);
			return;
		}

		watch(dataRef, (data) => {
			setCache(data);
			cached.value = false;
			console.log('fetched recent data for: ' + url);
		});
	};

	fetch();

	return { cached: cached.value, refetch: () => fetch(true) };
}
