const is_preview = import.meta.env.STORYBLOK_IS_PREVIEW

export default function isPreview() {
  return is_preview === 'yes'
}
