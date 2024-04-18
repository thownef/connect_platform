import ExpertProfile from "@/component/ExpertProfile/Index";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const Expert = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <ExpertProfile lang={lang} dictionary={dictionary} />
    </>
  );
};
export default Expert;
