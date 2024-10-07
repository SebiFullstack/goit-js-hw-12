import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"

const API_KEY = '46118726-f37cd2f98d2a6e2b7b3af8ac8';
const BASE_URL = 'https://pixabay.com/api/';
export async function fetchImages(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
q: query,
image_type: 'photo',
orientation: 'horizontal',
safesearch: true,
page,
per_page: 15,
  });
  try {
    const {data} = await axios(`${BASE_URL}?${searchParams}`)
    return data;
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later',
    })
  }
}