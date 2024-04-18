import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getUserData, fetchApiFailure, loginSuccess } from './action'
import { getUser, login } from '../callApi'
import { LOGIN_START, FetchDataRequestAction, JwtPayload, GetUserRequestAction, GET_USER_ID,  } from './type'
import { STATUS_CODE } from '@/util/constanst'
import { jwtDecode } from 'jwt-decode'

function* fetchDataLogin(action: FetchDataRequestAction) {
  try {
    const res: AxiosResponse = yield call(login, action.payload)
    if (res.status === STATUS_CODE.SUCCESS) {
      const decoded = jwtDecode(res.data.token) as JwtPayload;
      localStorage.setItem("accessToken", res.data.token);
      localStorage.setItem("c_user", decoded.id);
      yield put(loginSuccess(res.data))
    } else {
      yield put(fetchApiFailure('Incorrect Email or Password'))
    }
  } catch (e) {
    console.log(e)
  }
}

function* getUserLogin(action: GetUserRequestAction) {
  try {
    const id = action.payload;
    const res: AxiosResponse = yield call(getUser, id)
    if(res.status === STATUS_CODE.SUCCESS){
      yield put(getUserData(res.data.data))
    }
  } catch (e) {
    console.log(e)
  }
}

function* LoginSaga() {
  yield takeLatest(LOGIN_START, fetchDataLogin)
  yield takeLatest(GET_USER_ID, getUserLogin)
}
export default LoginSaga
