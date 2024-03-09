import axios from 'axios';

const KEY = '42752010-70402d91d951665a6458bc92c';
const BASE_URI = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URI, {
      params: {
        key: KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data.hits;
  } catch (error) {
    console.log('Error while fetching images from pixabay!', error);
    showErrorToast('Error while fetching images from pixabay!');

    return error;
  }
}
