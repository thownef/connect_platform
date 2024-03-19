import { HYDRATE } from 'next-redux-wrapper'
import * as TYPE from './type'
function myReducer(state = TYPE.authState, action: any) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }
    case TYPE.LOGIN_START:
      return { ...state, error: "" };
    case TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        error: "",
      };
      case TYPE.GET_DATA_USER:
        return {
          ...state,
          currentUser: action.payload,
          isLogin: true,
          error: "",
        };
    case TYPE.LOGOUT:
      localStorage.removeItem("c_user")
      localStorage.removeItem("accessToken")
      return {
        ...state,
        currentUser: TYPE.authState.currentUser,
        isLogin: false,
        error: "",
      };
    case TYPE.FETCH_API_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TYPE.RESET_ERROR_API:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
}
export default myReducer
