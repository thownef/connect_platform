import { HYDRATE } from 'next-redux-wrapper'
import * as TYPE from './type'
function myReducer(
  state: TYPE.STATE_TYPE = TYPE.initState,
  action: TYPE.DashBoardActionType
) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }
    //Get Expert
    case TYPE.GET_EXPERT:
      return { ...state, loading: true, error: null }
    case TYPE.GET_EXPERT_SUCCESS:
      return { ...state, loading: false, expert: action.payload }
    //Get Company
    case TYPE.GET_JP_COMPANY:
      return { ...state, loading: true, error: null }
    case TYPE.GET_JP_COMPANY_SUCCESS:
      return { ...state, loading: false, jpCompany: action.payload }

    default:
      return state
  }
}
export default myReducer
