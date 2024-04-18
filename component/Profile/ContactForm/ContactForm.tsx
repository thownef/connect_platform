import { Locale } from "@/util/constanst";
import "../../../component/Dashboard/Contact/index.scss"
import ContactForm from "@/atomic-component/ContactForm/Index";

const FormContact = ({
  lang,
  dictionary,
  isUser
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  isUser: boolean
}) => {
  
  return (
    <>
     {!isUser && <ContactForm lang={lang} dictionary={dictionary} page="profile"/>}
    </>
  );
};

export default FormContact;
