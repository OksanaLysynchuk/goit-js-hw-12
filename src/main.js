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
  const loadMoreButton = document.querySelector('.load-more');

  hideLoadMoreButton();

  let currentPage = 1;
  let currentQuery = '';
  let images = [];

  async function loadImages(query, page) {
    try {
      const response = await fetchImages(query, page);
      return response;
    } catch (error) {
      throw error;
    }
  }

  function resetGallery() {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '';
  }

  async function handleSearch(event) {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (!query) {
      showErrorToast('Please enter a search term');
      return;
    }

    currentQuery = query;
    currentPage = 1;
    resetGallery();
    showLoadingIndicator();
    hideEndMessage();
    hideLoadMoreButton();

    try {
      images = await loadImages(query, currentPage);
      hideLoadingIndicator();
      hideLoadMoreButton();
      handleSearchResults(images);
    } catch (error) {
      hideLoadingIndicator();
      showErrorToast('Error while fetching images from pixabay!');
    }
  }

  function handleSearchResults(images) {
    if (images.length === 0) {
      showErrorToast(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderGallery(images);
      if (images.length >= 15) {
        setTimeout(() => {
          showLoadMoreButton();
        }, 800);
      } else {
        setTimeout(() => {
          showEndMessage();
        }, 500);
      }
    }
  }

  async function handleLoadMore() {
    loadMoreButton.disabled = true;
    hideLoadMoreButton();
    hideEndMessage();
    currentPage++;
    try {
      showLoadingIndicator();
      const newImages = await loadImages(currentQuery, currentPage);
      handleLoadMoreResults(newImages);
    } catch (error) {
      showErrorToast('Error while fetching images from pixabay!');
    } finally {
      hideLoadingIndicator();
      loadMoreButton.disabled = false;
      window.scrollBy({
        top: window.innerHeight * 2,
        behavior: 'smooth',
      });
    }
  }

  function handleLoadMoreResults(newImages) {
    if (newImages.length === 0) {
      showEndMessage();
      hideLoadMoreButton();
    } else {
      images = images.concat(newImages);
      renderGallery(images);
      if (newImages.length >= 15) {
        setTimeout(() => {
          showLoadMoreButton();
        }, 800);
      } else {
        hideLoadMoreButton();
        setTimeout(() => {
          showEndMessage();
        }, 500);
      }
    }
  }

  function init() {
    searchForm.addEventListener('submit', handleSearch);
    loadMoreButton.addEventListener('click', handleLoadMore);
  }

  init();
});
