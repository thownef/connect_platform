import { HYDRATE } from "next-redux-wrapper";

export const FETCH_DATA_START = "FETCH_DATA_START"
export const GET_CATEGORY = "GET_CATEGORY"

export interface HydrateAction {
  type: typeof HYDRATE
  payload: any
}

export interface Category {
  id: string | number;
  name: string;
  name_en: string;
  name_jp: string;
  url: string;
  operator: string;
}

export const initialState = [];

export interface FetchDataRequestAction {
  type: typeof FETCH_DATA_START;
  payload: string | number;
}