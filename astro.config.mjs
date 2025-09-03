import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import storyblok from '@storyblok/astro'
import netlify from '@astrojs/netlify'
import { loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
const env = loadEnv('', process.cwd(), 'STORYBLOK')

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      livePreview: true,
      apiOptions: {
        region: '',
      },
      bridge: {
        customParent: 'https://app.storyblok.com',
      },
      components: {
        page: 'storyblok/Page',
        button: 'storyblok/Button',
        heading: 'storyblok/Heading',
        partners_section: 'storyblok/PartnersSection',
        hero: 'storyblok/Hero',
        banner_split: 'storyblok/BannerSplit',
        features_section: 'storyblok/FeaturesSection',
        stats_section: 'storyblok/StatsSection',
        reports_section: 'storyblok/ReportsSection',
        reports_list: 'storyblok/ReportsList',
        report: 'storyblok/Report',
        team_section: 'storyblok/TeamSection',
        testimonials_section: 'storyblok/TestimonialsSection',
        advisers_section: 'storyblok/AdvisersSection',
        banner_cta: 'storyblok/BannerCta',
        site_settings: 'storyblok/siteSettings',
      },
    }),
  ],
  vite: {
    plugins: [
      mkcert(),
      tailwindcss()
    ],
    server: {
      https: true,
    },
  },
})
