import { newsTemplatesByCategory, type NewsTemplate } from './newsTemplates'
import type { MediaCategory, News } from '../type/types'

type MediaNewsInput = {
  id: string
  title: string
  category: MediaCategory
}

export const NEWS_PER_MEDIA = 7

function getRotationStart(seed: string, templateCount: number) {
  const hash = seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)

  return hash % templateCount
}

function pickTemplates(seed: string, templates: readonly NewsTemplate[]) {
  const start = getRotationStart(seed, templates.length)

  return Array.from({ length: NEWS_PER_MEDIA }, (_, index) => {
    return templates[(start + index) % templates.length]
  })
}

export function createNewsDummyList(media: MediaNewsInput): News[] {
  const templates = newsTemplatesByCategory[media.category]
  const selectedTemplates = pickTemplates(media.id, templates)

  return selectedTemplates.map((template, index) => ({
    id: `${media.id}-news-${index + 1}`,
    title: `${media.title} | ${template.title}`,
    thumbnail: `/news/${media.id}-${index + 1}.png`,
    content: `${media.title} 기사 더미 데이터입니다. ${template.content} 이 문장은 ${media.title}의 톤과 카테고리 맥락을 반영해 뉴스스탠드 화면 검증용으로 작성됐습니다.`,
  }))
}
