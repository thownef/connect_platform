import ItClubPage from "@/component/ItClub/Index";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const ItClub = async ({
  params: { lang },
}: {
  params: { lang: Locale; slug: string };
}) => {
  const dictionary = await getDictionary(lang);
  return <ItClubPage lang={lang} dictionary={dictionary} />;
};

export default ItClub;
