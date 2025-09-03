import { getLanguagesCode } from '../utils/api'
const DEFAULT_LANG = import.meta.env.STORYBLOK_DEFAULT_LANG

const LANGUAGE_LABELS = {
  en: 'English',
  es: 'Español'
}

const LANGUAGE_FLAGS = {
  en: `<g clip-path="url(#a)"><rect width="22" height="16" x="-3" fill="#1A47B8" rx="2"/><path fill="#fff" fill-rule="evenodd" d="M-.66 0H-3v2.667L16.647 16H19v-2.667L-.66 0Z" clip-rule="evenodd"/><path fill="#F93939" d="M-2.22 0 19 14.438V16h-.762L-3 1.547V0h.78Z"/><path fill="#fff" fill-rule="evenodd" d="M16.905 0H19v2.667S5.391 11.55-.905 16H-3v-2.667L16.905 0Z" clip-rule="evenodd"/><path fill="#F93939" d="M19 0h-.71L-3 14.45V16h.78L19 1.559V0Z"/><path fill="#fff" fill-rule="evenodd" d="M5 0h6.018v4.935H19v6.127h-7.982V16H5v-4.938H-3V4.935h8V0Z" clip-rule="evenodd"/><path fill="#F93939" fill-rule="evenodd" d="M6.263 0h3.474v6.154H19v3.692H9.737V16H6.263V9.846H-3V6.154h9.263V0Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><rect width="22" height="16" x="-3" fill="#fff" rx="2"/></clipPath></defs>`,
  es: `<g clip-path="url(#a)"><rect width="22" height="16" x="-3" fill="#F93939" rx="2"/><path fill="#F93939" d="M16.905 0H-.905C-2.062 0-3 .955-3 2.133v11.734C-3 15.045-2.062 16-.905 16h17.81C18.062 16 19 15.045 19 13.867V2.133C19 .955 18.062 0 16.905 0Z"/><path fill="#FFDA2C" fill-rule="evenodd" d="M-3 4.267h22v7.466H-3V4.267Z" clip-rule="evenodd"/><path fill="#D4AF2C" fill-rule="evenodd" d="M6.429 6.637v2.688c0 .747-.704 1.344-1.572 1.344H2.762c-.865-.002-1.572-.603-1.572-1.346V6.635c0-.61.47-1.12 1.115-1.286.195-.554.794-.057 1.504-.057.715 0 1.31-.494 1.505.058.643.17 1.115.68 1.115 1.287Z" clip-rule="evenodd"/><path fill="#CBCBCB" fill-rule="evenodd" d="M6.429 7.467h1.047v3.2H6.43v-3.2Zm-6.286 0H1.19v3.2H.143v-3.2Z" clip-rule="evenodd"/><path fill="#1A47B8" fill-rule="evenodd" d="M6.429 9.6h1.047v1.067H6.43V9.6Zm-6.286 0H1.19v1.067H.143V9.6Z" clip-rule="evenodd"/><path fill="#D4AF2C" fill-rule="evenodd" d="M6.429 6.4h1.047v1.067H6.43V6.4Zm-6.286 0H1.19v1.067H.143V6.4Z" clip-rule="evenodd"/><path fill="#AF010D" fill-rule="evenodd" d="M2.238 6.4h1.048V8H2.238V6.4Zm2.095 2.133h1.048v1.6H4.333v-1.6Z" clip-rule="evenodd"/><path fill="#AE6A3E" fill-rule="evenodd" d="M4.333 6.4h1.048V8H4.333V6.4Z" clip-rule="evenodd"/><path fill="#FFDA2C" fill-rule="evenodd" d="M2.238 8.533h1.048v1.6H2.238v-1.6Z" clip-rule="evenodd"/><path fill="#AF010D" fill-rule="evenodd" d="M3.286 6.4 2.238 5.333h3.143L4.333 6.4H3.286Z" clip-rule="evenodd"/><path fill="#D4AF2C" fill-rule="evenodd" d="M3.286 4.267h1.047v1.066H3.286V4.267Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><rect width="22" height="16" x="-3" fill="#fff" rx="2"/></clipPath></defs>`,
}

const getLanguages = async () => {
  const storyblokLanguages = await getLanguagesCode()

  // Merge default language with other languages and remove duplicates
  return Array.from(
    new Set([DEFAULT_LANG, ...storyblokLanguages])
  )
}

const getLanguageLabel = (locale) => LANGUAGE_LABELS[locale]

const getLanguageFlag = (locale) => LANGUAGE_FLAGS[locale]

function getTransLink(language, slug) {
	return language === DEFAULT_LANG ? slug : `/${language}${slug}`
}

export { getLanguages, getLanguageLabel, getLanguageFlag, getTransLink }
