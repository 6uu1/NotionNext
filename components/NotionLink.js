import { siteConfig } from '@/lib/config'

const EXTERNAL_HTTP_LINK = /^https?:\/\//i

const mergeRelValues = (...values) => {
  const rel = new Set()

  values
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .forEach(token => rel.add(token))

  return rel.size > 0 ? Array.from(rel).join(' ') : undefined
}

const isExternalHttpLink = (href, siteOrigin) => {
  if (typeof href !== 'string' || !EXTERNAL_HTTP_LINK.test(href)) {
    return false
  }

  if (!siteOrigin) {
    return true
  }

  try {
    const hrefUrl = new URL(href)
    return hrefUrl.origin !== siteOrigin
  } catch {
    return true
  }
}

export const shouldOpenNotionLinkInNewTab = (href, target, siteOrigin) => {
  if (target === '_blank') {
    return true
  }

  const fallbackOrigin =
    siteOrigin ||
    (typeof window !== 'undefined' && window.location
      ? window.location.origin
      : null)

  return isExternalHttpLink(href, fallbackOrigin)
}

const getConfiguredSiteOrigin = () => {
  try {
    const link = siteConfig('LINK')
    return link ? new URL(link).origin : null
  } catch {
    return null
  }
}

const NotionLink = ({ href, target, rel, ...props }) => {
  const shouldOpenInNewTab = shouldOpenNotionLinkInNewTab(
    href,
    target,
    getConfiguredSiteOrigin()
  )
  const normalizedTarget = shouldOpenInNewTab ? '_blank' : target
  const normalizedRel = shouldOpenInNewTab
    ? mergeRelValues(rel, 'noopener noreferrer')
    : rel

  return (
    <a {...props} href={href} target={normalizedTarget} rel={normalizedRel} />
  )
}

export default NotionLink
