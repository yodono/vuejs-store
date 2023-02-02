<script setup lang="ts">
import { useCurrency } from '../hooks/useCurrency';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t, locale } = useI18n();
const l = computed(() => t(`${locale.value}-currency`));
const { currency, convertCurrency, refetch } = useCurrency('USD', l.value);
</script>

<template>
	<div class="home">
		<h1>Home</h1>
		<p>Is cached: {{ currency.cached }}</p>
		<p>{{ convertCurrency(1) }}</p>
		<button @click="refetch">refetch</button>
	</div>
</template>
