import { useStoryblokApi } from '@storyblok/astro'
import isPreview from './isPreview'

export async function getStory(slug = 'home', language) {
  const storyblokApi = useStoryblokApi()

  try {
    const { data } = await storyblokApi.get(
      `cdn/stories/${slug}`,
      {
        version: isPreview() ? 'draft' : 'published',
        resolve_relations: ['reports_section.reports'],
        language,
      }
    )
    return data.story
  } catch (error) {
    console.error(`Error fetching story with slug '${slug}':`, error)
    return null
  }
}

export async function getLinks() {
  const storyblokApi = useStoryblokApi()

  try {
    const links = await storyblokApi.getAll('cdn/links', {
      version: isPreview() ? 'draft' : 'published',
    })
    return links
  } catch (error) {
    console.error(`Error fetching links:`, error)
    return null
  }
}

export async function getSiteSettings(language) {
  const storyblokApi = useStoryblokApi()

  try {
    const { data } = await storyblokApi.get(
      `cdn/stories/settings/site-settings/`,
      {
        version: isPreview() ? 'draft' : 'published',
        language,
      }
    )
    return data.story
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

export async function getDatasource(slug) {
  const storyblokApi = useStoryblokApi()

  try {
    const { data } = await storyblokApi.get('cdn/datasource_entries', {
      datasource: slug,
      version: isPreview() ? 'draft' : 'published',
    })

    if (!data.datasource_entries || !Array.isArray(data.datasource_entries)) {
      console.error(`Storyblok datasource entries for '${slug}' not found or malformed.`)
      return {}
    }

    const colorMap = data.datasource_entries.reduce((acc, entry) => {
      acc[entry.name] = entry.value
      return acc
    }, {})

    return colorMap
  } catch (error) {
    console.error(`Error fetching Storyblok datasource '${slug}':`, error)
    return {}
  }
}

export async function getReportList(language) {
  const storyblokApi = useStoryblokApi()

  try {
    const { data } = await storyblokApi.get(`cdn/stories`, {
      version: isPreview() ? 'draft' : 'published',
      starts_with: 'report/',
      is_startpage: false,
      language,
    })
    return data.stories
  } catch (error) {
    console.error('Error fetching reports:', error)
    return []
  }
}

export async function getLanguagesCode() {
  const storyblokApi = useStoryblokApi()

  try {
    const { data } = await storyblokApi.get('cdn/spaces/me')
    return data.space.language_codes
  } catch (error) {
    console.error('Error fetching languages:', error)
    return []
  }
}
