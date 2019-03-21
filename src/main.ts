import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import contenteditable from 'vue-contenteditable';
Vue.use(contenteditable);

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: navigator.language.substr(0, 2),
	fallbackLocale: 'en',
	messages: {
		en: require('./locales/messages/en.json'),
		pl: require('./locales/messages/pl.json'),
	},
});

router.beforeEach((to, from, next) => {
	const language = to.meta.locale;
	if (language !== undefined) {
		i18n.locale = language;
	}
	next();
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	i18n,
	render: h => h(App),
}).$mount('#app');
