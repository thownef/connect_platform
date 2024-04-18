import { AxiosResponse } from "axios";
import { FetchDataRequestAction, GET_PROFILE } from "./type";
import { call, put, takeLatest } from "redux-saga/effects";
import { getCompany } from "../callApi";
import { STATUS_CODE } from "@/util/constanst";
import { getDataCompany } from "./action";
import { endLoading, startLoading } from "../loading/action";

function* fetchDataCompany(action: FetchDataRequestAction) {
  const id = action.payload;
  yield put(startLoading())
  try {
    const res: AxiosResponse = yield call(getCompany, id);
    if (res.status === STATUS_CODE.SUCCESS) {
        yield put(getDataCompany(res.data))
        yield put(endLoading())
    }
  } catch (e) {
    console.log(e);
  }
}

function* ProfileSaga() {
  yield takeLatest(GET_PROFILE, fetchDataCompany);
}
export default ProfileSaga;
