import { HYDRATE } from "next-redux-wrapper";
import * as TYPE from "./type";

function myReducer(state = TYPE.initialState, action: any) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case TYPE.REGISTER_SUCCESS:
      return { ...state, message: action.payload, success: true };

    case TYPE.REGISTER_FAIL:
      return { ...state, error: action.payload, success: false };

    default:
      return state;
  }
}
export default myReducer;
