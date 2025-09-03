import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import storyblok from '@storyblok/astro'
import { loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import netlify from '@astrojs/netlify';
import isPreview from './src/utils/isPreview'

const env = loadEnv('', process.cwd(), '')
const is_local_dev = import.meta.env.DEV
let output = 'static'
let adapter = undefined

console.log(isPreview())

if (!is_local_dev && isPreview()) {
  output = 'server'
  adapter = netlify()
}

export default defineConfig({
  output: output,
  adapter: adapter,

  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: isPreview(),
      livePreview: isPreview(),
      apiOptions: {
        region: '',
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

  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
      },
    ],
  },

  vite: {
    plugins: [
      mkcert(),
      tailwindcss()
    ],
    server: {
      https: true,
    },
  }
})
