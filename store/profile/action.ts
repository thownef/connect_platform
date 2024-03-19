import * as TYPE from "./type";

export const getProfileCompany = (id: number | string) => ({
  type: TYPE.GET_PROFILE,
  payload: id,
});

export const getDataCompany = (data: TYPE.InfoCompany) => ({
  type: TYPE.GET_DATA_PROFILE,
  payload: data,
});
