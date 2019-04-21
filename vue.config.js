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
			/** You need to be running the backend locally. 
			 *  This will let you test your app in development on a local machine. */
			'/api': {
				target: 'http://localhost:3000',
			},
		}
	},
	productionSourceMap: false
};