import { reactive } from 'vue';

interface Store {
	cart: Array<{
		productId: number;
		price: number;
		count: number;
	}>;
	cartTotalPrice: number;
}

export const store = reactive<Store>({
	cart: [],
	get cartTotalPrice() {
		return parseFloat(
			this.cart
				.reduce(
					(reduced: number, current: { count: number; price: number }) =>
						reduced + current.count * current.price,
					0
				)
				.toFixed(2)
		);
	}
});
