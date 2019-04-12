import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

// import Unauthorized from '@/views/Unauthorized.vue';
// import Authorized from '@/views/Authorized.vue';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Unauthorized',
			component: () =>
				import(/* webpackChunkName: "Unauthorized" */ '@/views/Unauthorized.vue').then(
					m => m.default
				),
		},
		{
			path: '/en/',
			name: 'Unauthorized',
			component: () =>
				import(/* webpackChunkName: "Unauthorized" */ '@/views/Unauthorized.vue').then(
					m => m.default
				),
			meta: {
				locale: 'en',
			},
		},
		{
			path: '/pl/',
			name: 'Unauthorized',
			component: () =>
				import(/* webpackChunkName: "Unauthorized" */ '@/views/Unauthorized.vue').then(
					m => m.default
				),
			meta: {
				locale: 'pl',
			},
		},
		{
			path: '/zalogowany/',
			name: 'Authorized',
			component: () =>
				import(/* webpackChunkName: "Authorized" */ '@/views/Authorized.vue').then(
					m => m.default
				),
			meta: {
				locale: 'pl',
				transition: { name: 'slide', from: 'Unauthorized' },
			},
		},
		{
			path: '/logged-in/',
			name: 'Authorized',
			component: () =>
				import(/* webpackChunkName: "Authorized" */ '@/views/Authorized.vue').then(
					m => m.default
				),
			meta: {
				locale: 'en',
				transition: { name: 'slide', from: 'Unauthorized' },
			},
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

export default router;
