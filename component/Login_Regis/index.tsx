'use client'
import { useState } from 'react'
import style from './index.module.scss'
import RegisterForm from './Register'
import LoginForm from './Login'
import { Locale } from '@/util/constanst'
import ModalSuccess from './Modal'

const Auth = ({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: { [key: string]: string }
}) => {
  const [toggle, setToggle] = useState(false)
  const formLayout = 'horizontal'
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={style.register__wrapper}>
        <div
          className={
            !toggle
              ? style.container
              : `${style.container} ${style.right_panel_active}`
          }
        >
          <RegisterForm lang={lang} dictionary={dictionary} toggle={toggle} setOpen={setOpen}/>

          <LoginForm lang={lang} dictionary={dictionary} toggle={toggle} />
          <div className={style.overlay_container}>
            <div className={style.overlay}>
              <div className={`${style.overlay_panel} ${style.overlay_left}`}>
                <h1>{dictionary['Welcome!']}</h1>
                <p>
                  {
                    dictionary[
                      "If you have an account. Please click the 'Sign In' button"
                    ]
                  }
                </p>
                <button
                  onClick={() => {
                    setToggle(!toggle)
                  }}
                  className={style.ghost}
                  id='signIn'
                >
                  {dictionary['Sign In']}
                </button>
              </div>

              <div className={`${style.overlay_panel} ${style.overlay_right}`}>
                <h1>{dictionary['Hello!']}</h1>
                <p>
                  {
                    dictionary[
                      "If you do not have an account, please click the 'Sign up' button."
                    ]
                  }
                </p>
                <button
                  onClick={() => {
                    setToggle(!toggle)
                  }}
                  className={style.ghost}
                  id='signUp'
                >
                  {dictionary['Sign Up']}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSuccess
        isOpen={open}
        setOpen={setOpen}
        lang={lang}
        dictionary={dictionary}
        formLayout={formLayout}
      />
    </>
  )
}

export default Auth
