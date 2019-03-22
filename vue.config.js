/* const path = require('path'); */
const SitemapPlugin = require('sitemap-webpack-plugin').default;
//const prettydata = require('pretty-data');
const merge = require('webpack-merge');

module.exports = {
	css: {
		loaderOptions: {
			sass: {
				data: `
			@import "@/scss/_variables.scss";
			@import "@/scss/global.scss";
		  `
			}
		}
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:80',
			},
		}
	},
	// '' -> https://dziennik-php.herokuapp.com
	// 'dziennik_php' -> localhost/dziennik_php
	publicPath: process.env.NODE_ENV === 'production' ? '' : 'dziennik_php',

	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			const newConfig = {};
			// mutate config for production...
			const paths = [
				'/',
				'/en',
				'/pl',
				'/logged-in',
				'/zalogowany',
				'/logged-in#add-student',
				'/zalogowany#dodaj-ucznia'
			];
			newConfig.mode = 'production';
			newConfig.plugins = [
				new SitemapPlugin('https://dziennik.netlify.com/', paths, {
					changeFreq: 'monthly',
					skipGzip: true,
				}),
			];
			return newConfig;
		}
	},

	/* ,
	build: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',

		productionSourceMap: true,

		// skipping the rest ...
	}, */
};