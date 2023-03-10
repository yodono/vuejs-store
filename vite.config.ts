import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

export default defineConfig({
	plugins: [
		vue(),
		vueI18n({
			include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**')
		})
	]
});
