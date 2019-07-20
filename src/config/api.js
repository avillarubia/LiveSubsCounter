import apiQuery from "../config/api.json";

export function constructEndpoint(param, query) {
  const apiEndpoint =
    process.env.REACT_APP_API_URL +
    "part=" +
    apiQuery.part +
    "&" +
    param +
    "=" +
    query +
    "&key=" +
    process.env.REACT_APP_API_KEY;
  return apiEndpoint;
}
