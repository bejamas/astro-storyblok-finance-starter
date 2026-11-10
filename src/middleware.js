import { sequence } from 'astro:middleware'
import { storyblokPreviewMiddleware } from '@storyblok/astro'

// Captures the Visual Editor's live preview payload so pages can read it with getPayload()
export const onRequest = sequence(storyblokPreviewMiddleware)
