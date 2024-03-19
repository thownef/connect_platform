import ContactPage from "@/component/Contact/Index";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const Contact = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return <ContactPage lang={lang} dictionary={dictionary} />;
};
export default Contact;
