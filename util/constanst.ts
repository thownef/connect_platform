export const DEFAULT_LOCALES = 'vi'
// export const DOMAIN = 'https://api-vjcb.vj-partner.com/server/'
export const ISSERVER = typeof window === "undefined";
export const UPLOAD_S3 = "http://192.168.0.222:8080/server/image/"

export const DOMAIN =
  process.env.NODE_ENV !== 'production'
    ? 'http://192.168.0.222:8080/server/'
    // ? 'http://localhost:8080/server/'
    : 'https://api-vjcb.vj-partner.com/server/'
export const i18n = {
  defaultLocale: DEFAULT_LOCALES,
  locales: ['en', 'ja', 'vi'],
} as const

export type Locale = (typeof i18n)['locales'][number]
export const STATUS_CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
}

export type CategoryList = {
  id: string | number;
  name: string;
  name_en: string;
  name_jp: string;
  name_ja: string;
  operator: string | number;
  url: string;
};

export type CategoryType =
  | CategoryList[]
