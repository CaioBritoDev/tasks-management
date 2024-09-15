const BASE_URL_APP = '/tasks-management';

export const createUrl = (path = "/") => {
  return `${BASE_URL_APP}${path}`;
};

const BASE_URL_API = 'https://tasks-management-one.vercel.app';

export const selectEndpoint = (path = "/") => {
  return `${BASE_URL_API}${path}`;
};
