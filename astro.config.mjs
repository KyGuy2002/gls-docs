// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({

    output: "server",
    adapter: cloudflare({
        platformProxy: {
            enabled: true
        }
    }),

    redirects: {
        "/hardware-setup/monitor-setup": "/setup/getting-started",
    },

    site: 'https://docs.lumeninsight.net',
    integrations: [
        starlight({
            title: 'Lumen Insight Docs',
            favicon: "/lumen-logo.ico",
            components: {
                Hero: './src/components/Hero.astro',
            },
            customCss: [
                './src/styles/global.css',
              ],
            social: {
                github: 'https://github.com/KyGuy2002/gls-docs',
            },
            sidebar: [
                {
                    label: 'System Setup',
                    items: [
                        'setup/getting-started',
                        'setup/hardware',
                        'setup/scanner',
                        'setup/enrollment',
                        {
                            label: 'Scanner Config',
                            collapsed: true,
                            autogenerate: { directory: 'setup/scanner-config' },
                        },
                    ],
                },
            ],
            editLink: {
                baseUrl: 'https://github.com/KyGuy2002/gls-docs/edit/master/',
            },
        }),
        sitemap(),
        react()
    ],

    vite: {
      resolve: {
        // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
        // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
        alias: import.meta.env.PROD && {
          "react-dom/server": "react-dom/server.edge",
        },
      },

      plugins: [tailwindcss()],
    },
});