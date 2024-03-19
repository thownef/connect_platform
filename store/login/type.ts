import { HYDRATE } from 'next-redux-wrapper'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const GET_USER_ID = 'GET_USER_ID'
export const GET_DATA_USER = 'GET_DATA_USER'
export const FETCH_API_ERROR = 'FETCH_API_ERROR'
export const RESET_ERROR_API = 'RESET_ERROR_API'
export const LOGOUT = 'LOGOUT'

export interface HydrateAction {
  type: typeof HYDRATE
  payload: any
}
export type ErrorType = {
  response: {
    status: number
  }
}
export type CurrentUser = {
  response: boolean
  id: number
  email: string
  country: string
  company_name: string
  user_name: string
  booking_count: number
  allow: number
  company_name_en: string
  company_name_jp: string
  operator: string
  highlight: number
}

export type LoginInfo = {
  email: string
  password: string
}
export type Auth = {
  currentUser: CurrentUser
  isLogin: boolean
  error: string
}
export const initCurrentUser = {
  id: 0,
  email: '',
  country: '',
  company_name: '',
  user_name: '',
  booking_count: '',
  company_name_en: '',
  company_name_jp: '',
  allow: 0,
  operator: '',
  highlight: 0,
}

export interface FetchDataRequestAction {
  type: typeof LOGIN_START
  payload: LoginInfo
}

export type userId = {
  id: number
}
export interface GetUserRequestAction {
  type: typeof LOGIN_SUCCESS;
  payload: userId;
}

export interface JwtPayload {
  id: string;
  email: string
}

export const authState = {
  currentUser: initCurrentUser,
  isLogin: false,
  error: '',
}
