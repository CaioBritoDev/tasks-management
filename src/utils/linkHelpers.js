const BASE_URL = '/tasks-management';

export const createUrl = (path = "/") => {
  return `${BASE_URL}${path}`;
};
