import { HYDRATE } from 'next-redux-wrapper'
import * as TYPE from './type'
function myReducer(state = TYPE.initialState, action: any) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }
    case TYPE.GET_COMPANY_INFO:
      return { ...state, companyInfo : action.payload };

    case TYPE.EDIT_COMPANY_INFO:
      return { ...state, companyInfo: action.payload };

    default:
      return state;
  }
}
export default myReducer
