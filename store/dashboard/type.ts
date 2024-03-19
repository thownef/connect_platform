import { HYDRATE } from 'next-redux-wrapper'
export const GET_EXPERT = 'GET_EXPERT'
export const GET_JP_COMPANY = 'GET_JP_COMPANY'
export const GET_EXPERT_SUCCESS = 'GET_EXPERT_SUCCESS'
export const GET_JP_COMPANY_SUCCESS = 'GET_JP_COMPANY_SUCCESS'

export type Expert = {
  id: string
  user_name: string
  user_name_jp: string
  user_name_en: string
  image: string
  specialize_vn: string
  specialize_jp: string
  specialize_en: string
}

export type JPCompany = {
  id: string | number;
  user_id: string | number;
  email: string;
  company_logo: string;
  estalishment: string;
  employers: string;
  needs_vn: string;
  category: string;
  capital: string;
  address_vn: string;
  logo_associations: string | null;
  info_url: string | null;
  needs_en: string;
  needs_jp: string;
  address_en: string;
  address_jp: string;
  allow: boolean;
  languages: string;
  area: string | number;
  country: string;
  company_ID: string | number;
  company_name: string;
  user_name: string;
  phone: string;
  booking_count: number;
  company_name_en: string;
  company_name_jp: string;
  operator: string;
  highlight: boolean;
  category_vn: string;
  category_en: string;
  category_jp: string;
};

export const initExpert = {
  id: '',
  user_name: '',
  user_name_jp: '',
  user_name_en: '',
  image: '',
  specialize_vn: '',
  specialize_jp: '',
  specialize_en: '',
}
export const initJPCompany = {
  id:"",
  user_id: "",
  email: "",
  company_logo: "",
  estalishment: "",
  employers: "",
  needs_vn: "",
  category: "",
  capital: "",
  address_vn: "",
  logo_associations: "",
  info_url: "",
  needs_en: "",
  needs_jp: "",
  address_en: "",
  address_jp: "",
  allow: "",
  languages: "",
  area: "",
  country: "",
  company_ID:  "",
  company_name: "",
  user_name: "",
  phone: "",
  booking_count: "",
  company_name_en: "",
  company_name_jp: "",
  operator: "",
  highlight: "",
  category_vn: "",
  category_en: "",
  category_jp: "",
}

export type STATE_TYPE = {
  expert: Expert[]
  jpCompany: JPCompany[]
}
export const initState = {
  expert: [],
  jpCompany: [],
}

export interface HydrateAction {
  type: typeof HYDRATE
  payload: any
}
interface GetExpertActionType {
  type: typeof GET_EXPERT
}

interface GetExpertSuccessActionType {
  type: typeof GET_EXPERT_SUCCESS
  payload: Expert[]
}

interface GetJPCompanyActionType {
  type: typeof GET_JP_COMPANY
}

interface GetCompanySuccessActionType {
  type: typeof GET_JP_COMPANY_SUCCESS
  payload: JPCompany[]
}

export type DashBoardActionType =
  | HydrateAction
  | GetExpertActionType
  | GetExpertSuccessActionType
  | GetJPCompanyActionType
  | GetCompanySuccessActionType
