import { getAllStories } from '../utils/api'
import { extractStoryMeta } from '../utils/extractStoryMeta'

export const GET = async () => {
	try {
		const stories = await getAllStories({
			sort_by: 'position:desc',
			excluding_slugs: 'settings/*',
		})

		// Filters all stories not in folders, such as Home and About
		const mainStories = stories.filter((story) => !story.parent_id)

		// Group stories by folder
		const childStories = stories.filter((story) => story.parent_id)
		const storiesByFolder = childStories.reduce((acc, story) => {
			const folder = story.full_slug.split('/')[0]
			if (!acc[folder]) acc[folder] = []
			acc[folder].push(story)
			return acc
		}, {})

		const mainExtract = mainStories.map((story) => extractStoryMeta(story))

		// Build sections by folder
		const folderSections = Object.entries(storiesByFolder)
			.map(([folder, folderStories]) => {
				const folderName = folder.replace(/^./, (firstLetter) =>
					firstLetter.toUpperCase()
				)
				const stories = folderStories
					.map((story) => {
						const meta = extractStoryMeta(story)
						return `- [${meta.headline}](https://astro-storyblok-finance-starter.netlify.app/${meta.slug})${meta.summary ? `: ${meta.summary}` : ''}`
					})
					.join('\n')
				return `\n## ${folderName}\n\n${stories}`
			})
			.join('\n')

    const body = `# Global Finance Starter

> Financial clarity tools for modern businesses

This file contains a list of all pages and resources on this website.

***

## Main Pages

${mainExtract
	.map(
		(story) =>
			`- [${story.headline}](https://astro-storyblok-finance-starter.netlify.app/${story.slug})${story.summary ? `: ${story.summary}` : ''}`,
	)
	.join('\n')}
${folderSections}
`
		return new Response(body, {
			headers: {
				'Content-Type': 'text/plain charset=utf-8',
			},
		})
	} catch (error) {
		console.error('Error generating llms.txt:', error)
		return new Response(`Failed to generate llms.txt \n\n${error}`, {
			status: 500,
		})
	}
}
