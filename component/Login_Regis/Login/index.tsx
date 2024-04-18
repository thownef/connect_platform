'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import Translate from '@/atomic-component/Translate'
import { Locale } from '@/util/constanst'
import style from '../index.module.scss'
import { callApiLogin, resetErrorApi } from '@/store/login/action'
import { initFormikBag, LoginFormType } from './constant'
import { loginSchema } from './validation'
import { Auth } from '@/store/login/type'
import { RootState } from '@/store/reducer'
const LoginForm = ({
  lang,
  toggle,
  dictionary,
}: {
  lang: Locale
  dictionary: { [key: string]: string }
  toggle: boolean
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth: Auth = useSelector((state: RootState) => {
    return state.auth
  })
  const handleSignIn = (values: LoginFormType) => {
    dispatch(callApiLogin(values))
  }
  const formikBag = useFormik({
    initialValues: initFormikBag,
    validationSchema: loginSchema(dictionary),
    onSubmit: (values: LoginFormType) => handleSignIn(values),
  })

  const resetError = () => {
    if (auth.error) {
      dispatch(resetErrorApi());
    }
  };
  
  useEffect(() => {
    sessionStorage.setItem('access_login', 'true')
    if (auth.isLogin === true) {
      router.push(`/${lang}/`)
    }
  }, [auth.isLogin])

  useEffect(() => {
    formikBag.resetForm();
    formikBag.setErrors({
      email: '',
      password: '',
    });
  }, [toggle])
  
  return (
      <div className={`${style.form_container} ${style.sign_in_container}`}>
        <div className='translate'>
          {toggle ? '' : <Translate lang={lang} />}
        </div>
        <form className={style.sign_in_form} onSubmit={formikBag.handleSubmit}>
          <h1>{dictionary['Sign In']}</h1>
          <div className={style.social_container}></div>
          <div className={style.user_info_email}>
            <span className={style.user_info_title}>
              {dictionary['or use your account']}
            </span>
            <input
              {...formikBag.getFieldProps('email')}
              type='email'
              placeholder={dictionary['Email']}
              autoComplete='off'
              onInput={resetError}
            />
            {formikBag.errors.email && formikBag.touched.email && (
              <h3 className={style.error_email_content}>
                {formikBag.errors.email}
              </h3>
            )}
          </div>
          <div className={style.user_info_password}>
            <input
              {...formikBag.getFieldProps('password')}
              type='password'
              placeholder={dictionary['Password']}
              onInput={resetError}
            />
            {formikBag.errors.password && formikBag.touched.password && (
              <h3 className={style.error_email_content}>
                {formikBag.errors.password}
              </h3>
            )}
            {auth.error && auth.error.length > 0 && (
              <h3 className={style.error_email_content}>
                {auth.error}
              </h3>
            )}
          </div>
          <button className='btn-login-form' type='submit'>
            {dictionary['Sign In']}
          </button>
        </form>
      </div>
  )
}
export default LoginForm
