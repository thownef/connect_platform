import * as TYPE from "./type";

export const fetchDataStart = (id: string | number) => ({
  type: TYPE.FETCH_DATA_START,
  payload: id,
});

export const getDataCompanyInfo = (data: TYPE.CompanyInfo) => ({
	type: TYPE.GET_COMPANY_INFO,
	payload: data,
});

export const editDataCompanyInfo = (data: TYPE.CompanyInfo) => ({
	type: TYPE.EDIT_COMPANY_INFO,
	payload: data,
});

export const updateDataCompanyInfo = (data: TYPE.CompanyInfo, id: string | number, success: (message: string) => void, error : (message: string) => void) => ({
	type: TYPE.UPDATE_COMPANY_INFO,
	payload: {data, id, success, error},
});