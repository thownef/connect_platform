import ProfileCompany from "@/component/Profile"
import { getDictionary } from "@/dictionaries/dictionaries"
import { Locale } from "@/util/constanst"

const Profile = async ({ params : {lang, slug} }: { params: {lang: Locale, slug: string } }) => {
  const dictionary = await getDictionary(lang)
  const userId: number = parseInt(slug);
  return <ProfileCompany lang={lang} dictionary={dictionary} userId={userId} />
}

export default Profile
