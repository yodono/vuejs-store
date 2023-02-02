<script setup lang="ts">
import { store } from '../context/store';
import CartDisplay from '../components/CartDisplay.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
	<div class="CartView-container">
		<span v-if="store.cart.length"> Cart Total Price: ${{ store.cartTotalPrice }} </span>
		<AConfigProvider>
			<template #renderEmpty>
				<div style="text-align: center">
					<AEmpty>
						<template #description>
							<p>{{ t('cart.no-products') }}</p>

							<AButton v-if="!store.cart.length" type="primary">
								<RouterLink to="/catalog">Go shop now!</RouterLink>
							</AButton>
						</template>
					</AEmpty>
				</div>
			</template>

			<AList>
				<AListItem v-for="cartItem in store.cart" :key="cartItem.productId">
					<CartDisplay :="cartItem" />
				</AListItem>
			</AList>
		</AConfigProvider>
	</div>
</template>

<style scoped>
.CartView-container {
	margin-top: 2em;
}
</style>
