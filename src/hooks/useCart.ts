import { store } from '../context/store';

export function useCart() {
	const removeFromCart = (productId: number) => {
		const foundProduct = store.cart.find((c) => c.productId === productId);

		if (!foundProduct) return;

		if (foundProduct.count <= 1) {
			removeAllFromCartById(productId);
			return;
		}

		store.cart.forEach((c) => {
			if (c.productId === foundProduct.productId) return { ...c, count: c.count-- };
			return c;
		});
	};

	const addToCart = (productId: number, price: number) => {
		const foundProduct = store.cart.find((c) => c.productId === productId);

		if (foundProduct) {
			store.cart.forEach((c) => {
				if (c.productId === foundProduct.productId) return { ...c, count: c.count++ };
				return c;
			});
		} else {
			store.cart.push({
				productId,
				price,
				count: 1
			});
		}
	};

	const removeAllFromCartById = (productId: number) => {
		store.cart = store.cart.filter((c) => c.productId !== productId);
	};

	const removeAllFromCart = () => {
		store.cart = [];
	};

	return { removeFromCart, addToCart, removeAllFromCartById, removeAllFromCart };
}
