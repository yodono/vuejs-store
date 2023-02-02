<script setup lang="ts">
import { useFetch } from '../hooks/useFetch';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useCart } from '../hooks/useCart';

const props = defineProps<{
	productId: number;
	count: number;
}>();

const {
	data: cartItem,
	error: cartError,
	loading,
	retry
} = useFetch(import.meta.env.VITE_BASE_API_URL + '/products/' + props.productId);

const { removeFromCart, addToCart, removeAllFromCartById } = useCart();
</script>

<template>
	<div class="container">
		<div v-if="cartError">
			<p>Oops! Error encountered: {{ cartError.message }}</p>
			<button @click="retry">Retry</button>
		</div>
		<div v-else class="card">
			<ABadgeRibbon :text="loading ? '&nbsp;&nbsp;' : count">
				<ACard hoverable>
					<ARow :gutter="32">
						<ACol :span="6">
							<img v-if="!loading" :alt="cartItem.title" :src="cartItem.image" />
							<ASkeletonImage v-else />
						</ACol>

						<ACol :span="18">
							<ACardMeta
								v-if="!loading"
								:title="cartItem.title"
								:description="cartItem.description"
							/>
							<ASkeleton v-else :paragraph="{ rows: 4 }" />
						</ACol>
					</ARow>
					<template #actions>
						<MinusOutlined key="decrease" @click="removeFromCart(productId)" />
						<PlusOutlined key="increase" @click="addToCart(productId, cartItem.price)" />
						<DeleteOutlined key="delete" @click="removeAllFromCartById(productId)" />
					</template>
				</ACard>
			</ABadgeRibbon>
		</div>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	display: flex;
	justify-content: center;
}
.card {
	width: 50%;
	margin: 0;
}

img {
	width: 100%;
}
</style>
