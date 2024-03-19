import PricingPage from "@/component/Pricing/Index";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const Pricing = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <PricingPage lang={lang} dictionary={dictionary} />
    </>
  );
};
export default Pricing;
