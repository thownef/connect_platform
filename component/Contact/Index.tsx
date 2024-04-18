"use client";
import ContactForm from "@/atomic-component/ContactForm/Index";
import { Locale } from "@/util/constanst";
import "./index.scss";

const ContactPage = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  return (
    <>
      <ContactForm lang={lang} dictionary={dictionary} page="contact" />
    </>
  );
};

export default ContactPage;
