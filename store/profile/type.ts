import { HYDRATE } from "next-redux-wrapper";

export const GET_PROFILE = "GET_PROFILE";
export const GET_DATA_PROFILE = "GET_DATA_PROFILE";

export interface HydrateAction {
  type: typeof HYDRATE;
  payload: any;
}

export type ProfileInfo = {
  id: string | number;
};

export interface FetchDataRequestAction {
  type: typeof GET_PROFILE;
  payload: ProfileInfo;
  dispatch: any;
}

export type CompanyDescription = {
  id: string | number;
  user_id: string | number;
  email: string;
  description: string;
  descriptionEN: string;
  descriptionJP: string;
};

export interface CompanyInfo {
  email: string,
  address_vn: string;
  address_en: string;
  address_jp: string;
  capital: string;
  country: string;
  category: string;
  category_vn: string;
  category_en: string;
  category_jp: string;
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
};

export type CompanyProduct = {
  id: number | string;
  user_id: number | string;
  email: string;
  product_name: string;
  product_description: string;
  product_picture: string;
  product_url: string;
  product_name_EN: string;
  product_name_JP: string;
  product_description_EN: string;
  product_description_JP: string;
};

export type CompanyFeature = {
  id: number | string;
  user_id: number | string;
  email: string;
  speciality_picture: string;
  speciality_desc: string;
  speciality_desc_en: string;
  speciality_desc_jp: string;
};

export type CompanyCoreMember = {
  id: number | string;
  user_id: number | string;
  email: string;
  member_name: string;
  member_position: string;
  member_picture: string;
  member_desc: string;
  member_desc_JP: string;
  member_desc_EN: string;
  member_position_EN: string;
  member_position_JP: string;
};

export type CompanyCustomer = {
  id: number | string;
  user_id: number | string;
  email: string;
  client_name: string;
  client_logo: string;
  client_url: string;
  client_url_EN: string;
  client_url_JP: string;
};

export interface CompanyReview  {
  id: number;
  user_id: number;
  content_vn: string;
  content_en: string;
  content_jp: string;
  review_img: string;
};

export type CompanyBooking = {
  id: string;
  slot_number: string;
  start_time_booking: string;
  end_time_booking: string;
};

export type InfoCompany = {
  company_description: CompanyDescription[];
  company_info: CompanyInfo[];
  company_products: CompanyProduct[];
  company_specialties: CompanyFeature[];
  company_core_members: CompanyCoreMember[];
  company_main_clients: CompanyCustomer[];
  review: CompanyReview[];
  slot_booking: CompanyBooking[];
};

export const initialState = {
  company_description:[],
	company_info: [],
	company_products: [],
	company_specialties: [],
	company_core_members: [],
	company_main_clients: [],
  review:[],
  slot_booking:[],
};