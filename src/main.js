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
  const spinner = document.querySelector('.spinner');
  const endMessage = document.querySelector('.end-message');

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

    try {
      images = await loadImages(query, currentPage);
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

  searchForm.addEventListener('submit', handleSearch);

  async function handleLoadMore() {
    loadMoreButton.disabled = true;
    spinner.classList.remove('hidden');
    currentPage++;
    try {
      const newImages = await loadImages(currentQuery, currentPage);
      if (newImages.length === 0) {
        hideLoadMoreButton();
        showEndMessage();
      } else {
        images = images.concat(newImages);
        renderGallery(images);
        if (newImages.length < 15) {
          hideLoadMoreButton();
        } else {
          showLoadMoreButton();
        }
      }
    } catch (error) {
      showErrorToast('Error while fetching images from pixabay!');
    } finally {
      hideLoadingIndicator();
      loadMoreButton.disabled = false;
      spinner.classList.add('hidden');
      window.scrollBy({
        top: window.innerHeight * 2,
        behavior: 'smooth',
      });
    }
  }

  loadMoreButton.addEventListener('click', handleLoadMore);
});
