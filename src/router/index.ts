import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Product from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import CatalogView from '../views/CatalogView.vue';

const routes = [
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('../views/NotFound.vue')
	},
	{ path: '/', name: 'Home', component: Home },
	{ path: '/product/:id', name: 'Product', component: Product },
	{ path: '/cart', name: 'Cart', component: CartView },
	{ path: '/catalog', name: 'Catalog', component: CatalogView }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
