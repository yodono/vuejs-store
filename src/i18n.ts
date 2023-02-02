import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
import { numberFormats } from './locales/numberFormats';

export const i18n = createI18n({
	legacy: false,
	locale: localStorage.getItem('locale') || 'it',
	fallbackLocale: 'en',
	numberFormats,
	messages
});
