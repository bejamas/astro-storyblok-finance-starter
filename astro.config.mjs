import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { storyblok } from '@storyblok/astro'
import { loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import netlify from '@astrojs/netlify'

const env = loadEnv('', process.cwd(), 'STORYBLOK')

let is_preview
let output = 'static'
let adapter = undefined

if (env.STORYBLOK_IS_PREVIEW === 'yes') {
  is_preview = true
  output = 'server'
  adapter = netlify()
}

export default defineConfig({
  output: output,
  adapter: adapter,

  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: {
        resolveRelations: ['reports_section.reports'],
      },
      enableFallbackComponent: true,
      livePreview: is_preview,
      apiOptions: {
        region: 'eu',
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
        hostname: '**.storyblok.com',
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
