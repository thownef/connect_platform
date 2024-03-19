import MailPage from "@/component/Mail/Index";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/util/constanst";

const Mail = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <MailPage lang={lang} dictionary={dictionary} />
    </>
  );
};
export default Mail;
