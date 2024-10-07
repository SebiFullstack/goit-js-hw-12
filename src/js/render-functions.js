export function createGalleryMarkup(images){
  return images.map(({webformatURL,largeImageURL,likes,views,comments,downloads,tags}) =>
    `<li class="gallery_item">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"><ul>
    <li>Likes ${likes}</li>
    <li>Views ${views}</li>
    <li>Comments ${comments}</li>
    <li>Downloads ${downloads}</li>
  </ul></a>
 </li>`).join('');
}