// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightAutoSidebar from 'starlight-auto-sidebar';

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
        "/api-doc": "/api-doc/start/auth/",
        "/setup/getting-started/": "/user-guide/setup/getting-started",
        "/setup/enrollment/": "/user-guide/setup/enrollment",
        "/setup/scanner-config/tera-9000/": "/user-guide/setup/scanner-config/tera-9000",
        "/hardware-setup/scanner-config/tera-hw0007/": "/user-guide/setup/scanner-config/tera-hw0007",
        "/hardware-setup/monitor-setup/": "/user-guide/setup/hardware",

        // 07 and 05 are the same config now but the 05 link exists in case something changes
        "/user-guide/setup/scanner-config/tera-hw0005": "/user-guide/setup/scanner-config/tera-hw0007",
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
            social: [
                {
                    icon: 'github',
                    label: 'GitHub',
                    href: 'https://github.com/KyGuy2002/gls-docs'
                },
                {
                    icon: 'email',
                    label: 'Support',
                    href: 'mailto:support@lumeninsight.net'
                }
            ],
            editLink: {
                baseUrl: 'https://github.com/KyGuy2002/gls-docs/edit/master/',
            },
            plugins: [
                starlightAutoSidebar(),
                starlightSidebarTopics([
                    {
                        label: 'User Guide',
                        link: '/user-guide/setup/getting-started',
                        icon: 'open-book',
                        items: [
                            {
                                label: 'Start Here',
                                autogenerate: { directory: 'user-guide/setup' },
                            },
                            {
                                label: 'Misc',
                                autogenerate: { directory: 'user-guide/misc' },
                            },
                        ],
                    },
                    {
                        label: 'API Docs',
                        link: '/api-doc/start/auth',
                        icon: 'seti:html',
                        items: [
                            {
                                label: 'Start Here',
                                autogenerate: { directory: 'api-doc/start' },
                            },
                            {
                                label: 'Content',
                                autogenerate: { directory: 'api-doc/content' },
                            },
                            {
                                label: 'Data',
                                autogenerate: { directory: 'api-doc/data' },
                            },
                            {
                                label: 'Appointments',
                                autogenerate: { directory: 'api-doc/appointments' },
                            },
                        ],
                    },
                ]),
            ],
            head: [
                {
                    tag: 'script',
                    attrs: {
                        type: 'application/ld+json',
                    },
                    content: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            name: "Lumen Insight Docs",
                            url: "https://docs.lumeninsight.net",
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "OnlineBusiness",
                            "sameAs": [
                                "https://lumeninsight.net"
                            ]
                        }
                    ])
                }
            ]
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