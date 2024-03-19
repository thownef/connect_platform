import { HYDRATE } from 'next-redux-wrapper'

export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const CLEAR_STATE = 'CLEAR_STATE'

export interface HydrateAction {
  type: typeof HYDRATE
  payload: any
}

export type RegisterUser = {
  message: string;
  success: boolean;
  error: string;
};

export const initialState = {
  message: "",
  success: false,
  error: "",
};

export interface FetchDataRequestAction {
  type: typeof REGISTER_START;
  payload: RegisterUser;
}
