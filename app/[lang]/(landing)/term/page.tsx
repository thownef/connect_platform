import TermPage from "@/component/Term/TermPage";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const Term = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <TermPage lang={lang} dictionary={dictionary} />
    </>
  );
};
export default Term;
