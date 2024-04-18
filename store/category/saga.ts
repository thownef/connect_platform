import { call, put, takeLatest } from "redux-saga/effects"
import { FETCH_DATA_START, FetchDataRequestAction,  } from "./type"
import { AxiosResponse } from "axios";
import { getCategory, getCompanyInfo } from "../callApi";
import { STATUS_CODE } from "@/util/constanst";
import { getDataCategory } from "./action";

function* fetchDataInfo(action: FetchDataRequestAction) {
  try {
    const res: AxiosResponse = yield call(getCategory);
    if (res.status === STATUS_CODE.SUCCESS) {
      yield put(getDataCategory(res.data.data));
    }
  } catch (e) {
    console.log(e);
  }
}

function* CategorySaga() {
  yield takeLatest(FETCH_DATA_START, fetchDataInfo)
}
export default CategorySaga
