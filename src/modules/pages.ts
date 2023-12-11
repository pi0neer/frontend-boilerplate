import { defineNuxtModule, extendPages } from '@nuxt/kit';
import fs from 'fs';

const hostName = '';

export default defineNuxtModule({
  setup(opts, nuxt) {
    extendPages((pages) => {
      pages.forEach((page) => {
        page.path = page.path.endsWith('/') ? page.path : page.path + '/';
        pages.push({
          ...page,
          name: `cn ${page.name}`,
          path: `/cn${page.path}`,
        });
      });
    });
    // note: generating sitemap
    extendPages((pages) => {
      let sitemapLinks = '';
      pages.forEach((page) => {
        sitemapLinks += `<url><loc>${hostName}${page.path}</loc></url>`;
      });

      fs.writeFileSync(
        'sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${sitemapLinks}</urlset>`,
      );
    });
  },
});
