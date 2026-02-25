import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import compress from '@playform/compress';

export default defineConfig({
  site: 'https://progreenclean.co.uk',
  output: 'static',
  integrations: [
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/window-cleaning': '/services/window-cleaning/',
    '/gutter-cleaning': '/services/gutter-cleaning/',
    '/domestic-cleaning': '/services/domestic-cleaning/',
    '/end-of-tenancy-cleaning': '/services/end-of-tenancy-cleaning/',
    '/commercial-cleaning': '/services/commercial-cleaning/',
    '/carpet-cleaning': '/services/carpet-cleaning/',
    '/oven-cleaning': '/services/oven-cleaning/',
    '/pressure-washing': '/services/pressure-washing/',
    '/solar-panel-cleaning': '/services/solar-panel-cleaning/',
    '/wp-admin': '/',
    '/wp-login.php': '/',
  },
});

