import { all } from 'redux-saga/effects'
import DashboardSaga from './dashboard/saga'
import LoginSaga from './login/saga'
import LoadingSaga from './loading/saga'
import RegisterSaga from './register/saga'
import ProfileSaga from './profile/saga'
import InfoSaga from './info/saga'
import CategorySaga from './category/saga'

function* rootSaga() {
  yield all([DashboardSaga(), LoginSaga(), LoadingSaga(), RegisterSaga(), ProfileSaga(), InfoSaga(), CategorySaga()])
}

export default rootSaga
