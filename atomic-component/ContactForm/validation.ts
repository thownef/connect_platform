import * as Yup from "yup";
export const contactSchema = (dictionary: { [key: string]: string }) => {
  return Yup.object().shape({
    email_contact: Yup.string()
      .email(dictionary["Invalid email"])
      .required(dictionary["Please enter your email"]),
    fullname: Yup.string().required(dictionary["Please enter your name"]),
    phone: Yup.string().required(dictionary["Please enter your phone"]).matches(/^(\+)?[0-9]+$/, dictionary['Invalid phone number']),
    company_contact: Yup.string().required(
      dictionary["Please enter your company name"]
    ),
    description: Yup.string().required(
      dictionary["Please enter your message"]
    ),
  });
};

export const contactUserSchema = (dictionary: { [key: string]: string }) => {
  return Yup.object().shape({
    fullname: Yup.string().required(dictionary["Please enter your name"]),
    position: Yup.string().required(dictionary["Please enter your position"]),
    phone: Yup.string().required(dictionary["Please enter your phone"]).matches(/^[0-9]+$/, dictionary['Invalid phone number']),
    description: Yup.string().required(
      dictionary["Please enter your message"]
    ),
  });
};


export const contactExpertSchema = (dictionary: { [key: string]: string }) => {
  return Yup.object().shape({
    fullname: Yup.string().required(dictionary["Please enter your name"]),
    position: Yup.string().required(dictionary["Please enter your position"]),
    phone: Yup.string().required(dictionary["Please enter your phone"]).matches(/^[0-9]+$/, dictionary['Invalid phone number']),
    content: Yup.string().required(
      dictionary["Please enter your message"]
    ),
  });
};
