import defaultSettings from '../settings'

const title = defaultSettings.title || '医疗综合提醒'

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
