import VueRouterSitemap from 'vue-router-sitemap';
import * as path from 'path';
import router from './router';

export const sitemapMiddleware = () => {
	return (req: Request, res: Response) => {
		const staticSitemap = path.resolve('dist/static', 'sitemap.xml');
		new VueRouterSitemap(router)
			.build('http://0.0.0.0:3000')
			.save(staticSitemap);
	};
};
