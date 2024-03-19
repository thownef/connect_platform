import * as Yup from 'yup'
export const customerSchema = (dictionary: { [key: string]: string }) => {
  return Yup.object().shape({
    client_name: Yup.string().required('This field is required'),
	client_logo: Yup.string().required('This field is required'),
  })
}
