import * as TYPE from "./type";

export const fetchDataStart = () => ({
	type: TYPE.FETCH_DATA_START,
});

export const getDataCategory = (data: TYPE.Category) => ({
	type: TYPE.GET_CATEGORY,
	payload: data
});