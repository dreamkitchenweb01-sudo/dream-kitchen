import { dateParts } from '../../lib/dates'
import { rajyotsava } from '../../config/rajyotsava'

/** "Till 30 Nov" (the last day in src/config/rajyotsava.js), in the visitor's language */
export function rajyotsavaWhen(t) {
  const p = dateParts(rajyotsava.endsOn)
  return t('banner.rajTill', { date: `${p.day} ${t('dates.months')[p.month - 1]}` })
}

/** "Handmade festive treats · Till 30 Nov · Order on WhatsApp" */
export const rajyotsavaLine = (t) => [t('banner.rajLine'), rajyotsavaWhen(t), t('banner.rajOrder')]
