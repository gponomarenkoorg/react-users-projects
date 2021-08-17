const BASE_URL = 'https://api.github.com';

export const request = async(url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: '669292319',
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const serverResponse = await response.json();

    return serverResponse.data || serverResponse;
  } catch (error) {
    throw new Error(`Server error: ${error.message}`);
  }
};
