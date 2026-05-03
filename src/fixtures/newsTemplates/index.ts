import type { MediaCategory } from '../../type/types'
import { broadcastNewsTemplates } from './broadcast'
import { economyNewsTemplates } from './economy'
import { itNewsTemplates } from './it'
import { localNewsTemplates } from './local'
import { magazineNewsTemplates } from './magazine'
import { sportsNewsTemplates } from './sports'

export type NewsTemplate = {
  title: string
  content: string
}

export const newsTemplatesByCategory: Record<MediaCategory, readonly NewsTemplate[]> = {
  ECONOMY: economyNewsTemplates,
  BROADCAST: broadcastNewsTemplates,
  IT: itNewsTemplates,
  SPORTS: sportsNewsTemplates,
  MAGAZINE: magazineNewsTemplates,
  LOCAL: localNewsTemplates,
}
