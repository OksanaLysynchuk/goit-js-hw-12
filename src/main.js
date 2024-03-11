import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoadingIndicator,
  hideLoadingIndicator,
  hideLoadMoreButton,
  showLoadMoreButton,
  showErrorToast,
  showEndMessage,
  hideEndMessage,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.querySelector('.search-page');
  const searchInput = document.querySelector('.search-placeholder');
  const gallery = document.querySelector('.gallery');
  const loadMoreButton = document.querySelector('.load-more');
  const spinner = document.querySelector('.spinner');
  const endMessage = document.querySelector('.end-message');

  searchForm.addEventListener('submit', handleSearch);

  let currentPage = 1;
  let currentQuery = '';

  async function loadImages(query, page) {
    try {
      const data = await fetchImages(query, page);
      return data.hits;
    } catch (error) {
      showErrorToast('Error while fetching images from pixabay!');
      throw error; // Re-throw the error to handle it properly
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
        showLoadMoreButton();
      }
    } catch (error) {
      hideLoadingIndicator();
      showErrorToast('Error while fetching images from pixabay!');
    }
  }

  loadMoreButton.addEventListener('click', handleLoadMore);

  async function handleLoadMore() {
    loadMoreButton.disabled = true;
    spinner.classList.remove('hidden');
    currentPage++;
    try {
      const images = await loadImages(currentQuery, currentPage);
      if (images.length === 0) {
        hideLoadMoreButton();
        showEndMessage();
      } else {
        renderGallery(images);
        showLoadMoreButton();
      }
    } catch (error) {
      showErrorToast('Error while fetching images from pixabay!');
    } finally {
      hideLoadingIndicator();
      loadMoreButton.disabled = false;
      window.scrollBy({
        top: window.innerHeight * 2,
        behavior: 'smooth',
      });
      hideEndMessage();
    }
  }
});
