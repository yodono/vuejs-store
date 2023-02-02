<script setup lang="ts">
import { computed, watch } from 'vue';
import { useFetch } from '../hooks/useFetch';
import { useRoute } from 'vue-router';
import ProductDisplay from '../components/ProductDisplay.vue';
import SpinFeedback from '../components/SpinFeedback.vue';

const route = useRoute();
const id = computed(() => route.params.id);
const fetchUrl = computed(() => import.meta.env.VITE_BASE_API_URL + '/products/' + `${id.value}`);

const { data: product, loading: productLoading, error: productError, retry } = useFetch(fetchUrl);

watch(product, (r) => {
	console.log(!!r);
});
</script>

<template>
	<div class="product">
		<div v-if="productLoading">
			<SpinFeedback />
		</div>
		<div v-else-if="productError">
			<p>Oops! Error encountered: {{ productError.message }}</p>
			<button @click="retry">Retry</button>
		</div>
		<div v-else-if="product">
			<ProductDisplay :="product" />
		</div>
		<div v-else>
			<p>Sorry, unfortunately we couldn't find this product</p>
			<AButton type="primary"><RouterLink to="/catalog">Go to the catalog</RouterLink></AButton>
		</div>
	</div>
</template>

<style scoped>
.product {
	padding: 5em 0;
}
</style>
