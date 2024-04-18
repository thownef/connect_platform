
import CreateProfilePage from "@/component/CreateProfile/Index";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const UpdateInfo = async ({
  params: { lang },
}: {
  params: { lang: Locale; slug: string };
}) => {
  const dictionary = await getDictionary(lang);
  return <CreateProfilePage lang={lang} dictionary={dictionary} />;
};

export default UpdateInfo;
