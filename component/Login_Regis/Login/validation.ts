import * as Yup from 'yup'
export const loginSchema = (dictionary: { [key: string]: string }) => {
  return Yup.object().shape({
    email: Yup.string()
      .email(dictionary['Invalid email'])
      .required(dictionary['Please enter your email']),
    password: Yup.string().required(dictionary['Please enter a password']),
  })
}
