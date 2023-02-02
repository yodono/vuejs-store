import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n';
import 'ant-design-vue/dist/antd.css';
import CountryFlag from 'vue-country-flag-next';

createApp(App).use(router).use(Antd).use(i18n).use(CountryFlag).mount('#app');
