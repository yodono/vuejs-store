<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, t, availableLocales } = useI18n();

const handleLocaleChange = (newLocale: string) => {
	locale.value = newLocale;
	localStorage.setItem('locale', newLocale);
};
</script>

<template>
	<a-dropdown style="width: 100%">
		<template #overlay>
			<a-menu>
				<a-menu-item
					v-for="availableLocale in availableLocales"
					:key="`locale-${availableLocale}`"
					:value="availableLocale"
					@click="handleLocaleChange(availableLocale)"
				>
					<span role="img" :aria-label="`locale-${availableLocale}`">
						<country-flag :country="t(availableLocale)" size="small" />
					</span>
					&nbsp;
					{{ t(`${availableLocale}-name`, 1, { locale: availableLocale }) }}
				</a-menu-item>
			</a-menu>
		</template>
		<a-dropdown-button>
			Language
			<template #icon><country-flag :country="t(locale)" size="small" /></template>
		</a-dropdown-button>
	</a-dropdown>
</template>
