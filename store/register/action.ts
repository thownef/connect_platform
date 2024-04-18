import { RegisterFormType } from '@/component/Login_Regis/Register/constant'
import * as TYPE from './type'

export const callApiRegister = (data: RegisterFormType) => ({
	type: TYPE.REGISTER_START,
	payload: data,
})

export const registerSuccess = (data: string) => ({
  type: TYPE.REGISTER_SUCCESS,
  payload: data
});

export const registerFail = (data: string) => ({
  type: TYPE.REGISTER_FAIL,
  payload: data,
});