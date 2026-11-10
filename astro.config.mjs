import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import netlify from '@astrojs/netlify'

const env = loadEnv('', process.cwd(), 'STORYBLOK')

let is_preview = env.STORYBLOK_IS_PREVIEW === 'yes'
let output
let adapter

// local dev
if (import.meta.env.DEV) {
  output = "server"
  adapter = undefined
}

// local build
else if (env.STORYBLOK_ENVIRONMENT === 'development') {
  output = "static"
  adapter = undefined
  is_preview = false
}

// cloud
else {
  adapter = is_preview ? netlify() : undefined
  output = is_preview ? "server" : "static"
}

export default defineConfig({
  output: output,
  adapter: adapter,

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
