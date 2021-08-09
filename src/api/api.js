/* eslint-disable arrow-body-style */
const BASE_URL = 'https://api.github.com/';

export const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      try {
        return response.json();
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .then(responseData => responseData.data || responseData);
};

export const getUser = user => request(`/users/${user}`);
