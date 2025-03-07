// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
                    label: 'Hardware Setup',
                    autogenerate: { directory: 'hardware-setup' },
                },
            ],
            editLink: {
                baseUrl: 'https://github.com/KyGuy2002/gls-docs/edit/master/',
            }
        }),
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