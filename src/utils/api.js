import { createApiClient } from '@storyblok/api-client'
import isPreview from './isPreview'

export const apiClient = createApiClient({
  accessToken: import.meta.env.STORYBLOK_TOKEN,
  region: 'eu',
  // Replace resolved relation UUIDs with the related stories, like storyblok-js-client did
  inlineRelations: true,
})

const version = () => (isPreview() ? 'draft' : 'published')

// Fetches every page of a paginated list endpoint and returns all items
async function listAll(list, key, query) {
  const perPage = 100
  let page = 1
  let items = []

  while (true) {
    const { data, error, response } = await list({ query: { ...query, per_page: perPage, page } })
    if (error) throw error

    items = items.concat(Object.values(data[key]))
    const total = Number(response.headers.get('total')) || 0
    if (page * perPage >= total) return items
    page += 1
  }
}

export async function getStory(slug = 'home', language) {
  const { data, error } = await apiClient.stories.get(slug, {
    query: {
      version: version(),
      resolve_relations: 'reports_section.reports',
      language,
    },
  })

  if (error) {
    console.error(`Error fetching story with slug '${slug}':`, error)
    return null
  }
  return data.story
}

export async function getAllStories(query = {}) {
  return listAll(apiClient.stories.list, 'stories', { version: version(), ...query })
}

export async function getLinks() {
  try {
    return await listAll(apiClient.links.list, 'links', { version: version(), paginated: '1' })
  } catch (error) {
    console.error(`Error fetching links:`, error)
    return null
  }
}

export async function getSiteSettings(language) {
  const { data, error } = await apiClient.stories.get('settings/site-settings', {
    query: { version: version(), language },
  })

  if (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
  return data.story
}

export async function getDatasource(slug) {
  const { data, error } = await apiClient.datasourceEntries.list({
    query: { datasource: slug },
  })

  if (error) {
    console.error(`Error fetching Storyblok datasource '${slug}':`, error)
    return {}
  }

  if (!data.datasource_entries || !Array.isArray(data.datasource_entries)) {
    console.error(`Storyblok datasource entries for '${slug}' not found or malformed.`)
    return {}
  }

  return data.datasource_entries.reduce((acc, entry) => {
    acc[entry.name] = entry.value
    return acc
  }, {})
}

export async function getReportList(language) {
  const { data, error } = await apiClient.stories.list({
    query: {
      version: version(),
      starts_with: 'report/',
      is_startpage: false,
      language,
    },
  })

  if (error) {
    console.error('Error fetching reports:', error)
    return []
  }
  return data.stories
}

export async function getLanguagesCode() {
  const { data, error } = await apiClient.spaces.get()

  if (error) {
    console.error('Error fetching languages:', error)
    return []
  }
  return data.space.language_codes
}
