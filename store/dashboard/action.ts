import * as TYPE from './type'
export const callApiGetExpert = () => ({
  type: TYPE.GET_EXPERT,
})

export const callApiGetJPCompany = () => ({
  type: TYPE.GET_JP_COMPANY,
})

export const getJPCompanySuccess = (data: TYPE.JPCompany[]) => ({
  type: TYPE.GET_JP_COMPANY_SUCCESS,
  payload: data,
})

export const getExpertSuccess = (data: TYPE.Expert[]) => ({
  type: TYPE.GET_EXPERT_SUCCESS,
  payload: data,
})
