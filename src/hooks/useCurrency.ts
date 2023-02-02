import { reactive, ref, Ref, watch } from 'vue';
import { useFetch } from './useFetch';

const CURRENCY_API_URL = import.meta.env.VITE_CURRENCY_API_URL;
const CURRENCY_BASE_AMOUNT = 1;
const CURRENCY_KEY = 'currencies';

export function useCurrency(from: string, to: string) {
	const getCachedCurrencies = () => JSON.parse(localStorage.getItem(CURRENCY_KEY) || '{}');
	const currency = reactive({
		from,
		to,
		cached: false,
		date: Date,
		rate: 0
	});
	const error: Ref = ref(null);
	const loading: Ref = ref(true);

	function cache() {
		const fiveDaysFromNow = Date.parse(
			new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toString()
		);

		const formattedCurrency = {
			...getCachedCurrencies(),
			[from]: {
				...getCachedCurrencies()[from],
				[to]: {
					date: currency.date,
					rate: currency.rate,
					expiry: fiveDaysFromNow
				}
			}
		};

		localStorage.setItem(CURRENCY_KEY, JSON.stringify(formattedCurrency));
	}

	const fetchCurrency = (refetch = false) => {
		if (!refetch && getCachedCurrencies()?.[from]?.[to]?.expiry > Date.now()) {
			fetchCached();
			console.log('fetched cached data!');
			return;
		}

		const {
			data: dataRef,
			error: errorRef,
			loading: loadingRef
		} = useFetch(CURRENCY_API_URL, {
			reqOptions: {
				params: { to, from, amount: CURRENCY_BASE_AMOUNT },
				headers: {
					apikey: import.meta.env.VITE_CURRENCY_API_KEY
				}
			}
		});

		watch(errorRef, (error) => {
			errorRef.value = error;
		});
		watch(loadingRef, (loading) => {
			loadingRef.value = loading;
		});
		watch(dataRef, (data) => {
			currency.rate = data.result;
			currency.date = data.date;
			currency.cached = false;
			console.log('fetched recent data!');
			cache();
		});
	};

	const fetchCached = () => {
		currency.rate = getCachedCurrencies()[from][to].rate;
		currency.cached = true;
		loading.value = false;
	};

	const convertCurrency = (amount: number) => {
		return amount * currency.rate;
	};

	fetchCurrency();

	return { currency, loading, error, refetch: () => fetchCurrency(true), convertCurrency };
}
