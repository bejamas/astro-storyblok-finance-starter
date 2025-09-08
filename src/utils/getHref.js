export function getHref(linkObject) {
  if (!linkObject) return '/'

  let href

  if (linkObject.linktype === 'story') {
    href = linkObject.cached_url
    // Add leading slash for internal links if missing
    if (href && !href.startsWith('/')) {
      href = `/${href}`
    }
  } else if (linkObject.linktype === 'url') {
    href = linkObject.url
  }

  return href || '/'
}
