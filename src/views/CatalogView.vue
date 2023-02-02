<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { debounce } from 'lodash';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../hooks/useCart';
import { stringToColor } from '../utils/stringToColor';
import { ShoppingCartOutlined } from '@ant-design/icons-vue';
import SpinFeedback from '../components/SpinFeedback.vue';

const { t, n, locale } = useI18n();
const { addToCart } = useCart();
const router = useRouter();

const productsFilters = ref('');
const fetchUrl = computed(
	() => import.meta.env.VITE_BASE_API_URL + '/products' + productsFilters.value
);

const {
	data: products,
	error: productsError,
	loading: productsLoading,
	retry: productsRetry
} = useFetch(fetchUrl, { cache: true });

const {
	data: categories,
	error: categoriesError,
	loading: categoriesLoading
} = useFetch(import.meta.env.VITE_BASE_API_URL + '/products/categories', { cache: true });

const onSelectCategory = (category: string) => {
	productsFilters.value = category ? `/category/${category}` : '';
};

const onSearchCategory = debounce((searchString: string) => {
	productsFilters.value = searchString ? `/category/${searchString}` : '';
}, 1000);

const clearFilters = () => {
	productsFilters.value = '';
};
</script>

<template>
	<div class="container">
		<APageHeader :title="t('catalog')">
			<ADescriptions :column="3">
				<ADescriptionsItem>
					<AAutoComplete
						class="certain-category-search"
						dropdown-class-name="certain-category-search-dropdown"
						:dropdown-match-select-width="500"
						:options="(categories || []).map((c: string) => ({ value: c, text: c }))"
						:disabled="categoriesLoading"
						@select="onSelectCategory"
						@search="onSearchCategory"
					>
						<template #option="item">
							<span> {{ item.text }} </span>
						</template>
						<AInputSearch
							:placeholder="t('search-category')"
							:loading="categoriesLoading"
							allow-clear
						></AInputSearch>
					</AAutoComplete>
				</ADescriptionsItem>
			</ADescriptions>
		</APageHeader>

		<div v-if="productsLoading">
			<SpinFeedback />
		</div>

		<div v-else-if="productsError">
			<p>Oops! Error encountered: {{ productsError.message }}</p>
			<button @click="productsRetry">Retry</button>
		</div>

		<div v-else-if="!products.length && productsFilters.length">
			<p>
				{{ t('no-products-in-category') }}
				<strong>{{ productsFilters.split('/').at(-1) }}</strong>
			</p>
			<AButton type="primary" @click="clearFilters"> {{ t('clear-filters') }} </AButton>
		</div>

		<div v-else-if="products">
			<ARow :gutter="[50, 50]">
				<ACol
					v-for="product in products"
					:key="product.id"
					:xs="20"
					:sm="16"
					:md="12"
					:lg="6"
					:xl="6"
					style="display: flex"
				>
					<ACard
						hoverable
						style="flex: 1; display: flex; flex-direction: column; justify-content: space-between"
						@click="router.push(`/product/${product.id}`)"
					>
						<template #extra>
							<ATag :color="stringToColor(product.category, '85')">
								{{ product.category }}
							</ATag>
						</template>

						<template #cover>
							<img alt="example" :src="product.image" />
						</template>

						<ACardMeta>
							<template #description>
								<ADivider />

								<p>
									<strong></strong>
								</p>
								{{ product.title }}
							</template>
						</ACardMeta>

						<template #actions>
							<span class="buy-button" role="button">{{
								t('buy-for', { price: n(product.price, 'currency', locale) })
							}}</span>
							<ShoppingCartOutlined
								key="cart"
								@click.stop.prevent="addToCart(product.id, product.price)"
							/>
						</template>
					</ACard>
				</ACol>
			</ARow>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	padding: 5em;
	gap: 1em;
}

.buy-button {
	color: green;
	opacity: 75%;
}

.buy-button:hover {
	opacity: 55%;
}

img {
	max-height: 15em;
	width: auto;
	max-width: 100%;
	padding: 1em 2em 0em 2em;
	margin-left: auto;
	margin-right: auto;
}
</style>

<style></style>
