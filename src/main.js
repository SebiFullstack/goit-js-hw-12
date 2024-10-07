import iziToast from "izitoast";
import { fetchImages } from "./js/pixabay-api";
import { createGalleryMarkup } from "./js/render-functions";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader')
const loadMoreBtn = document.querySelector('.load-more');
let page=1
let query=''
const lightbox = new simpleLightbox('.gallery a');
form.addEventListener('submit', onFormSearch);
async function onFormSearch(event){
  event.preventDefault();
  query = event.target.elements.state.value.trim();
  console.log(query);
  page=1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  if(query === ''){
    iziToast.warning({
      message: 'Please enter a search query',
    })
    return;
  }
  loader.style.display = 'block';
  try {
    const data = await fetchImages(query, page);
    if(data.hits.length === 0){
      iziToast.warning({
        message: 'Sorry, there are no images matching your search query. Please try again!'
      })
      return;
    }
const markup = createGalleryMarkup(data.hits);
gallery.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
if(data.totalHits > 15){
  loadMoreBtn.classList.remove('is-hidden');

}else{
  loadMoreBtn.classList.add('is-hidden');
}
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later',
    })

  }
  finally {
    loader.style.display = 'none';
    form.reset();
  }
}

loadMoreBtn.addEventListener('click', onLoadMore);
async function onLoadMore(){
  page += 1;
  loader.style.display = 'block';
  try {
    const data = await fetchImages(query, page);
    const markup = createGalleryMarkup(data.hits);
gallery.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
const card = document.querySelector('.gallery_item');
const cardHeight = card.getBoundingClientRect().height;
window.scrollBy({
  top: cardHeight * 2,
  behavior : "smooth",
})
const maxPage = Math.ceil(data.totalHits / 15);
if (maxPage === page){
  loadMoreBtn.classList.add('is-hidden');
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
  })
}
else{
  loadMoreBtn.classList.remove('is-hidden');
}
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later',
    })

  }
  finally{
    loader.style.display = 'none';
  }
}