/* eslint-disable arrow-body-style */
// https://api.github.com/repos/octocat/hello-world
// https://api.github.com/users/USERNAME/
// https://api.github.com/users/USERNAME/repos

const BASE_URL = 'https://api.github.com';

export const request = async(url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const serverResponse = await response.json();

    return serverResponse.data || serverResponse;
  } catch (error) {
    throw new Error(`Server error: ${error.message}`);
  }
};

// export const getUser = user => request(`/users/${user}`);
// export const getRepo = async(user, repo) => request(`repos/${user}/${repo}`);
