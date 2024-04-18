import { END_LOADING, START_LOADING } from "./type";

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});
