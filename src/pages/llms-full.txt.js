import { getAllStories } from '../utils/api'
import { extractStoryMeta } from '../utils/extractStoryMeta'
import { convertedMarkdown } from '../utils/html2md'

export const GET = async () => {
	try {
		const stories = await getAllStories({
			sort_by: 'position:desc',
			excluding_slugs: 'settings/*',
		})

		const storyExtract = stories
			.map((story) => {
				const richTextContent = story.content?.content
				const markdownContent = richTextContent
					? convertedMarkdown(richTextContent)
					: ''

				return extractStoryMeta(story, {
					content: markdownContent,
				})
			})
			// Filter out stories with no content
			.filter((story) => story.content && story.content !== 'No content available')

      const body = `# Global Finance Starter

> Financial clarity tools for modern businesses

This file contains the full text content of all pages on this website, optimized for AI language models and search systems.

***

${storyExtract
	.map(
		(story) =>
			`## ${story.headline}

${story.content}

**URL**: [${story.headline}](https://astro-storyblok-finance-starter.netlify.app/${story.slug})

***
`,
	)
	.join('\n')}

---

For more information, visit [https://astro-storyblok-finance-starter.netlify.app](https://astro-storyblok-finance-starter.netlify.app)
`
		return new Response(body, {
			headers: {
				'Content-Type': 'text/plain charset=utf-8',
			},
		})
	} catch (error) {
		console.error('Error generating llms-full.txt:', error)
		return new Response(`Failed to generate llms-full.txt \n\n${error.message}`, {
			status: 500,
		})
	}
}
