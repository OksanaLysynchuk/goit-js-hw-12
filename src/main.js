import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoadingIndicator,
  hideLoadingIndicator,
  hideLoadMoreButton,
  showLoadMoreButton,
  showEndMessage,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.querySelector('.search-page');
  const searchInput = document.querySelector('.search-placeholder');
  const gallery = document.querySelector('.gallery');
  const loadMoreButton = document.querySelector('.load-more');
  const spinner = document.querySelector('.spinner');

  searchForm.addEventListener('submit', handleSearch);

  let currentPage = 1;
  let currentQuery = '';

  async function loadImages(query, page) {
    try {
      const data = await fetchImages(query, page);
      return data.hits;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    gallery.innerHTML = '';

    const query = searchInput.value.trim();

    if (!query) {
      showErrorToast('Please enter a search term');
      return;
    }

    currentQuery = query;
    currentPage = 1;
    showLoadingIndicator();

    try {
      const images = await loadImages(query, currentPage);
      hideLoadingIndicator();
      if (images.length === 0) {
        showErrorToast(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else {
        renderGallery(images);
      }
      showLoadMoreButton();
    } catch (error) {
      hideLoadingIndicator();
      showErrorToast('Error while fetching images from pixabay!');
    }
  }

  function handleLoadMore() {
    loadMoreButton.disabled = true;
    spinner.classList.remove('hidden');
    currentPage++;
    loadImages(currentQuery, currentPage)
      .then(images => {
        if (images.length === 0) {
          hideLoadMoreButton();
          showEndMessage();
        } else {
          renderImages(images);
        }
      })
      .finally(() => {
        spinner.classList.add('hidden');
        loadMoreButton.disabled = false;
        window.scrollBy({
          top: window.innerHeight * 2,
          behavior: 'smooth',
        });
      });
  }
});
