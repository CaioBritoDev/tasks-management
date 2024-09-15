const BASE_URL_APP = '/tasks-management';

export const createUrl = (path = "/") => {
  return `${BASE_URL_APP}${path}`;
};

const BASE_URL_API = 'http://localhost:3000';

export const selectEndpoint = (path = "/") => {
  return `${BASE_URL_API}${path}`;
};
