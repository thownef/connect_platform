import { Expert, langList } from './constant'

export const getSliderUserNm = (lang: string, user: Expert) => {
  const userNm: { specialize: string; user_name: string } = {
    specialize: '',
    user_name: '',
  }
  switch (lang) {
    case langList.vi:
      userNm.specialize = user.specialize_vn
      userNm.user_name = user.user_name
      break
    case langList.en:
      userNm.specialize = user.specialize_en
      userNm.user_name = user.user_name_en
      break
    case langList.ja:
      userNm.specialize = user.specialize_jp
      userNm.user_name = user.user_name_jp
    default:
      break
  }
  return userNm
}
