'use client'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Locale } from '@/util/constanst'
import Radio from 'antd/es/radio'
import style from '../index.module.scss'
import { initFormikBag, RegisterFormType } from './constant'
import { registerSchema } from './validation'
import Translate from '@/atomic-component/Translate'
import { callApiRegister } from '@/store/register/action'
import { RootState } from '@/store/reducer'
import { RegisterUser } from '@/store/register/type'
import { Checkbox } from 'antd'
const RegisterForm = ({
  lang,
  toggle,
  dictionary,
  setOpen
}: {
  lang: Locale
  dictionary: { [key: string]: string }
  toggle: boolean
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch()
  const register: RegisterUser = useSelector((state: RootState) => {
    return state.register
  })
  const handleSignUp = (values: RegisterFormType) => {
    dispatch(callApiRegister(values))
  }
  const formikBag = useFormik({
    initialValues: initFormikBag,
    validationSchema: registerSchema(dictionary),
    onSubmit: (values: RegisterFormType) => handleSignUp(values),
  })

  useEffect(() => {
    if(register.success){
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [register.success])

  useEffect(() => {
    formikBag.resetForm();
    formikBag.setErrors({
      company_name: '',
      email: '',
      password: '',
      c_password: '',
      user_name: '',
      phone: '',
    });
  }, [toggle])

  return (
    <div className={`${style.form_container} ${style.sign_up_container}`}>
      <div className="translate">{toggle ? <Translate lang={lang} /> : ""}</div>
      <form className={style.sign_in_form} onSubmit={formikBag.handleSubmit}>
        <h1>{dictionary["Register"]}</h1>
        <div className={style.social_container}></div>
        <input
          {...formikBag.getFieldProps("company_name")}
          placeholder={dictionary["Name company"]}
          className="title-register"
        />
        {formikBag.errors.company_name && formikBag.touched.company_name && (
          <h3 className={style.error_email_content}>
            {formikBag.errors.company_name}
          </h3>
        )}
        <input
          type="email"
          {...formikBag.getFieldProps("email")}
          placeholder={dictionary["Email"]}
        />
        {formikBag.errors.email && formikBag.touched.email && (
          <h3 className={style.error_email_content}>
            {formikBag.errors.email}
          </h3>
        )}
        <input
          {...formikBag.getFieldProps("user_name")}
          type="text"
          placeholder={dictionary["User name"]}
        />
        {formikBag.errors.user_name && formikBag.touched.user_name && (
          <h3 className={style.error_email_content}>
            {formikBag.errors.user_name}
          </h3>
        )}
        <input
          {...formikBag.getFieldProps("phone")}
          type="tel"
          maxLength={20}
          placeholder={dictionary["Phone"]}
        />
        {formikBag.errors.phone && formikBag.touched.phone && (
          <h3 className={style.error_email_content}>
            {formikBag.errors.phone}
          </h3>
        )}
        <input
          type="password"
          {...formikBag.getFieldProps("password")}
          placeholder={dictionary["Password"]}
        />
        {formikBag.errors.password && formikBag.touched.password && (
          <h3 className={style.error_email_content}>
            {formikBag.errors.password}
          </h3>
        )}
        <input
          type="password"
          {...formikBag.getFieldProps("c_password")}
          placeholder={dictionary["Confirm Password"]}
        />
        {formikBag.errors.c_password && formikBag.touched.c_password && (
          <h3 className={style.error_email_content}>
            {formikBag.errors.c_password}
          </h3>
        )}
        <Radio.Group
          onChange={formikBag.handleChange}
          value={formikBag.values.country}
          style={{ marginBottom: "30px" }}
          name="country"
        >
          <Radio value="Japan">{dictionary["Japan"]}</Radio>
          <Radio value="Viet Nam">{dictionary["Viet Nam"]}</Radio>
        </Radio.Group>
        <Checkbox name='isAccept' onChange={formikBag.handleChange} checked={formikBag.values.isAccept} style={{ marginBottom: "10px" }}>
          By clicking Sign Up, you agree to our
          <a
            href="https://vjp-connect.com/term"
            target="_blank"
            style={{ color: "blue" }}
          >
            「Terms of Use」.
          </a>
        </Checkbox>
        {formikBag.errors.isAccept && formikBag.touched.isAccept && (
          <h3 className={style.error_email_content}>
            {formikBag.errors.isAccept}
          </h3>
        )}
        {register.error && (
          <h3 className={style.error_email_content}>{register.error}</h3>
        )}
        <button type="submit">{dictionary["Sign Up"]}</button>
      </form>
    </div>
  );
}
export default RegisterForm
