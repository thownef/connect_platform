import { END_LOADING, START_LOADING, initLoading } from "./type";

function myReducer(state = initLoading, action: any) {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, loading: true };
    }

    case END_LOADING: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
export default myReducer;
