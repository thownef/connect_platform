import { call, put, takeLatest } from 'redux-saga/effects'
import { getExpertSuccess, getJPCompanySuccess } from './action'
import { getExpertClient, getJpCompany } from '../callApi'
import { Expert, GET_EXPERT, JPCompany, GET_JP_COMPANY } from './type'
import { AxiosResponse } from 'axios'
import { STATUS_CODE } from '@/util/constanst'

function* callApiGetExpert() {
  try {
    const res: AxiosResponse = yield call(getExpertClient, "")
    if(res.status === STATUS_CODE.SUCCESS) {
      yield put(getExpertSuccess(res.data.data))
    }
  } catch (e) {
    console.log(e)
  }
}
function* callApiGetJPCompany() {
  try {
    const res: AxiosResponse = yield call(getJpCompany)
    if(res.status === STATUS_CODE.SUCCESS) {
      yield put(getJPCompanySuccess(res.data.data))
    }
  } catch (e) {
    console.log(e)
  }
}

function* DashboardSaga() {
  yield takeLatest(GET_EXPERT, callApiGetExpert)
  yield takeLatest(GET_JP_COMPANY, callApiGetJPCompany)
}
export default DashboardSaga
