import ListExpert from "@/component/ListExpert/Index";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const FindExpert = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <ListExpert lang={lang} dictionary={dictionary} />
    </>
  );
};
export default FindExpert;
