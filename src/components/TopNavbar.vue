<script setup lang="ts">
import { BellOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import { store } from '../context/store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LocaleChanger from './LocaleChanger.vue';

const { t } = useI18n();
const router = useRouter();
const currentRouteName = computed(() => router.currentRoute.value.name?.toString().toLowerCase());

const cartTotalCount = computed(() =>
	store.cart
		.map((c) => c.count)
		.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
);

const onSearch = (val: number) => {
	if (val) router.push(`/product/${val}`);
};
</script>

<template>
	<AMenu
		mode="horizontal"
		style="display: flex; position: sticky; top: 0; z-index: 999999"
		:selected-keys="[currentRouteName]"
	>
		<AMenuItem key="home">
			<RouterLink to="/"><HomeOutlined /></RouterLink>
		</AMenuItem>
		<AMenuItem key="catalog">
			<RouterLink to="/catalog">{{ t('catalog') }}</RouterLink>
		</AMenuItem>

		<!-- antd has an issue with flex-grow: 1 that shrinks everything in the menu -->
		<AMenuItem style="flex-grow: 0.95" disabled>
			<AInputSearch :placeholder="t('search-product')" style="padding-top: 5px" @search="onSearch">
			</AInputSearch>
		</AMenuItem>

		<AMenuItem key="sub1-1" disabled>
			<LocaleChanger />
		</AMenuItem>

		<AMenuItem key="notification">
			<ABadge :count="5">
				<AAvatar style="background-color: transparent; color: black" size="small">
					<BellOutlined />
				</AAvatar>
			</ABadge>
		</AMenuItem>

		<AMenuItem key="cart">
			<RouterLink to="/cart">
				<ShoppingCartOutlined /> {{ t('cart.your-cart') }} ({{ cartTotalCount }})
			</RouterLink>
		</AMenuItem>

		<a-sub-menu key="sub1">
			<template #icon>
				<AAvatar src="https://thispersondoesnotexist.com/image" />
			</template>
		</a-sub-menu>
	</AMenu>
</template>
