import { call, put, takeLatest } from "redux-saga/effects"
import { FETCH_DATA_START, FetchDataRequestAction, PushDataRequestAction, UPDATE_COMPANY_INFO } from "./type"
import { AxiosResponse } from "axios";
import { getCompanyInfo, updateCompanyInfo } from "../callApi";
import { STATUS_CODE } from "@/util/constanst";
import { fetchDataStart, getDataCompanyInfo } from "./action";
import { getProfileCompany } from "../profile/action";
import { endLoading } from "../loading/action";

function* fetchDataInfo(action: FetchDataRequestAction) {
  try {
    const res: AxiosResponse = yield call(getCompanyInfo, action.payload);
    if (res.status === STATUS_CODE.SUCCESS) {
      yield put(getDataCompanyInfo(res.data.data));
    }
  } catch (e) {
    throw e;
  }
}

function* pushDataInfo(action: PushDataRequestAction) {
  const { id, data, success, error} = action.payload
  try {
    const res: AxiosResponse = yield call(updateCompanyInfo, data, id);
    if (res && res.status === STATUS_CODE.SUCCESS) {
      success(res.data.message)
      yield put(endLoading());
    } else {
      error(res.data.message)
      yield put(endLoading());
    }
  } finally {
    yield put(endLoading());
    yield put(getProfileCompany(data.user_id));
    yield put(fetchDataStart(data.user_id));
  }
}

function* InfoSaga() {
  yield takeLatest(FETCH_DATA_START, fetchDataInfo)
  yield takeLatest(UPDATE_COMPANY_INFO, pushDataInfo)
}
export default InfoSaga
