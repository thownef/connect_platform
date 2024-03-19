import Auth from '@/component/Login_Regis'
import { getDictionary } from '@/dictionaries/dictionaries'
import { Locale } from '@/util/constanst'
const Login = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang)
  return <Auth lang={lang} dictionary={dictionary} />
}

export default Login
