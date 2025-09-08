import { getLinks } from '../utils/api'
import { getLanguages } from './i18n'
const DEFAULT_LANG = import.meta.env.STORYBLOK_DEFAULT_LANG
const links = await getLinks()
const languages = await getLanguages()

export default async function generateStaticPaths() {
  let paths = []
  links
    .filter((link) => !link.is_folder && link.slug !== 'settings/site-settings')
    .forEach((link) => {
      languages.forEach((language) => {
        //This slug will be used for fetching data from storyblok
        let slug = link.slug === 'home' ? undefined : link.slug
        //This will be used for generating all the urls for astro
        let full_url = language === DEFAULT_LANG ? slug : `${language}/${slug ?? ''}`
        //This will let us change the url for diffrent versions
        let langSwitch = {}
        languages.forEach((lang) => {
          langSwitch = {
            ...langSwitch,
            [lang]: lang === DEFAULT_LANG ? `/${slug ?? ''}` : `/${lang}/${slug ?? ''}`,
          }
        })
        paths.push({
          props: { language, slug, langSwitch },
          params: {
            slug: full_url,
          },
        })
      })
    })
  return paths
}
