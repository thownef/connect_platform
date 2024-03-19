import { combineReducers } from 'redux'
import dashBoardReducer from './dashboard/reducer'
import authReducer from './login/reducer'
import loadingReducer from './loading/reducer'
import registerReducer from './register/reducer'
import profileReducer from './profile/reducer'
import infoReducer from './info/reducer'
import categoryReducer from './category/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  dashBoard: dashBoardReducer,
  loading: loadingReducer,
  register: registerReducer,
  profile: profileReducer,
  info: infoReducer,
  category: categoryReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
