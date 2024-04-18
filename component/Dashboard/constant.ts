export type Expert = {
  id: string
  user_name: string
  user_name_jp: string
  user_name_en: string
  image: string
  specialize_vn: string
  specialize_jp: string
  specialize_en: string
}

export const initExpert = {
  id: '',
  user_name: '',
  user_name_jp: '',
  user_name_en: '',
  image: '',
  specialize_vn: '',
  specialize_jp: '',
  specialize_en: '',
}
export type Partner = {
  have_link: boolean
  link?: string
  img: string
}

export const partnerArr: Partner[] = [
  {
    have_link: false,
    img: 'images/logo-company-1.png',
  },
  {
    have_link: false,
    img: 'images/logo-company-2.png',
  },
  {
    have_link: false,
    img: 'images/logo-company-3.png',
  },
  {
    have_link: false,
    img: 'images/logo-company-4.png',
  },
  {
    have_link: true,
    img: 'images/logo-company-5.png',
    link: 'https://shop.inbachvuong.com/',
  },
  {
    have_link: false,
    img: 'images/logo-company-6.png',
  },
]
export const langList = {
  vi: 'vi',
  en: 'en',
  ja: 'ja',
}
