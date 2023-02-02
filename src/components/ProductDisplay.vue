<script setup lang="ts">
import { useCart } from '../hooks/useCart';

defineProps<{
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}>();

const { addToCart } = useCart();
</script>

<template>
	<div class="ProductDisplay-container">
		<div>
			<AImage width="20em" height="auto" :src="image" :alt="title" />
		</div>
		<div>
			<p>
				<ARate :value="rating.rate" disabled />
				<span>({{ rating.rate }}) • {{ rating.count }} reviews</span>
			</p>
			<h1>{{ title }}</h1>
			<p>{{ description }}</p>

			<div class="buy-area">
				<p>
					<strong>${{ price }}</strong>
				</p>
				<button>Buy now</button>
				<button @click="addToCart(id, price)">Add to cart</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.ProductDisplay-container {
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: 100%;
	padding: 1em;
}

.ProductDisplay-container .buy-area {
	margin-top: 3em;
}

.ProductDisplay-container .buy-area button {
	margin-inline: 0.5em;
}
</style>
