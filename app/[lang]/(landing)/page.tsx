import { getDictionary } from '@/dictionaries/dictionaries'
import Dashboard from '@/component/Dashboard'
import { Locale } from '@/util/constanst'

async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)
  return (
    <>
      <Dashboard lang={lang} dictionary={dictionary} />
    </>
  )
}
export default Home
