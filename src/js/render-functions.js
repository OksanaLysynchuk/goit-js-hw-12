import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderGallery(images) {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';

  images.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');

    const imgLink = document.createElement('a');
    imgLink.href = image.largeImageURL;
    imgLink.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    imgLink.appendChild(img);
    card.appendChild(imgLink);
    galleryContainer.appendChild(card);
  });

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function showLoadingIndicator() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

export function hideLoadingIndicator() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  loadMoreButton.classList.add('hidden');
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  loadMoreButton.classList.remove('hidden');
}

export function showEndMessage() {
  const endMessage = document.querySelector('.end-message');
  endMessage.classList.remove('hidden');
}

export function hideEndMessage() {
  const endMessage = document.querySelector('.end-message');
  endMessage.classList.add('hidden');
}

export function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}
