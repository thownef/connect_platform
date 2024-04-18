import SearchPage from "@/component/Search/Index";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const Search = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return <SearchPage lang={lang} dictionary={dictionary} />;
};
export default Search;
