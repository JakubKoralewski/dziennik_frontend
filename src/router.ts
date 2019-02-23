import Vue from 'vue';
import Router from 'vue-router';
import Unauthorized from '@/views/Unauthorized.vue';
import Authorized from '@/views/Authorized.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Unauthorized',
			component: Unauthorized,
		},
		{
			path: '/zalogowany',
			name: 'Authorized',
			component: Authorized,
		},

		/* ,
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" *\/ './views/About.vue'),
		}, */
	],
});
