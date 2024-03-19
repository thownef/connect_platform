import * as Yup from 'yup'
export const registerSchema = (dictionary: { [key: string]: string }) => {
  return Yup.object().shape({
    company_name: Yup.string().required(
      `${dictionary["Please enter your company name"]}`
    ),
    email: Yup.string()
      .email(dictionary["Invalid email"])
      .required(dictionary["Please enter your email"]),
    password: Yup.string()
      .required(dictionary["Please enter a password"])
      .min(6, dictionary["Password must be at least 6 characters"]),
    c_password: Yup.string()
      .nullable()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(dictionary["Please enter a password"]),
    user_name: Yup.string().required(
      `${dictionary["Please enter your name"]}`
    ),
    phone: Yup.string().required(
      `${dictionary["Please enter your phone"]}`
    ),
    isAccept: Yup.boolean()
    .oneOf([true], `${dictionary["Please enter your phone"]}`)
    .required(),
  });
}
