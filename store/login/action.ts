import * as TYPE from './type'

export const callApiLogin = (data: TYPE.LoginInfo) => ({
  type: TYPE.LOGIN_START,
  payload: data,
})

export const loginSuccess = (data: TYPE.LoginInfo) => ({
  type: TYPE.LOGIN_SUCCESS,
})

export const getUserId = (id: number) => ({
  type: TYPE.GET_USER_ID,
  payload: id,
})

export const getUserData = (data: TYPE.CurrentUser) => ({
  type: TYPE.GET_DATA_USER,
  payload: data,
})

export const fetchApiFailure = (error: string) => ({
  type: TYPE.FETCH_API_ERROR,
  payload: error,
})

export const resetErrorApi = () => ({
  type: TYPE.RESET_ERROR_API,
})

export const logout = () => ({
  type: TYPE.LOGOUT
})
