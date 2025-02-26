// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({

	output: "server",
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		}
	}),

	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/KyGuy2002/gls-docs',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],

	vite: {
		resolve: {
		  // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
		  // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
		  alias: import.meta.env.PROD && {
			"react-dom/server": "react-dom/server.edge",
		  },
		},
	  },
});
