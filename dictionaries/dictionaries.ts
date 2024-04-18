import 'server-only'
import { Locale, DEFAULT_LOCALES, i18n } from '../util/constanst'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  ja: () => import('./ja.json').then((module) => module.default),
  vi: () => import('./vi.json').then((module) => module.default),
}

export const getDictionary = async (locale?: Locale) => {
  if (locale && ['en', 'ja', 'vi'].includes(locale)) {
    return dictionaries[locale]()
  }
  return dictionaries[DEFAULT_LOCALES]()
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}
