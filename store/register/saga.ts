import { call, put, takeLatest } from "redux-saga/effects"
import { AxiosResponse } from "axios";
import { STATUS_CODE } from "@/util/constanst";
import { FetchDataRequestAction, REGISTER_START } from "./type";
import { register, sendMailRegister } from "../callApi";
import { registerFail, registerSuccess } from "./action";

function* fetchDataRegister(action: FetchDataRequestAction) {
	try {
	  const res: AxiosResponse = yield call(register, action.payload)
	  if (res.status === STATUS_CODE.SUCCESS) {
		yield call(sendMailRegister, action.payload)
		yield put(registerSuccess(res.data.message))
	  } else {
		yield put(registerFail(res.data.message))
	  }
	} catch (e) {
	  console.log(e)
	}
  }

function* RegisterSaga() {
  yield takeLatest(REGISTER_START, fetchDataRegister)
}
export default RegisterSaga
