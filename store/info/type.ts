import { HYDRATE } from "next-redux-wrapper";

export const FETCH_DATA_START = 'FETCH_DATA_START'
export const GET_COMPANY_INFO = "GET_COMPANY_INFO";
export const EDIT_COMPANY_INFO = "EDIT_COMPANY_INFO";
export const UPDATE_COMPANY_INFO = "UPDATE_COMPANY_INFO";

export interface HydrateAction {
  type: typeof HYDRATE
  payload: any
}

export interface CompanyInfo {
  address_vn: string;
  address_en: string;
  address_jp: string;
  capital: string;
  category: string;
  company_logo: string;
  company_name: string;
  company_name_en: string;
  company_name_jp: string;
  employers: string;
  estalishment: string;
  info_url: string;
  needs_en: string;
  needs_jp: string;
  needs_vn: string;
  languages: string;
}

export const initialState = {
  companyInfo: {
    address_vn: "",
    address_en: "",
    address_jp: "",
    capital: "",
    category: "",
    company_logo: "",
    company_name: "",
    company_name_en: "",
    company_name_jp: "",
    employers: "",
    estalishment: "",
    info_url: "",
    needs_en: "",
    needs_jp: "",
    needs_vn: "",
    languages: "",
  },
};

export interface FetchDataRequestAction {
  type: typeof FETCH_DATA_START;
  payload: string | number;
}

export interface PushDataRequestAction {
  type: typeof UPDATE_COMPANY_INFO;
  payload: any;
}