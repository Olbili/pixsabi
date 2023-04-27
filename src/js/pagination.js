// //-------------------------------
// // async function getData() {
// //     const Response = await fetch(
// //         `https://pixabay.com/api/?key=35542818-db0a564bafb06d3dd4571f809&${params}`
// //     );
// //     console.log(Response);
// // };
// //--------------------------------
function inputValue(e) {
  const value = e.target.value.trim();
  const params = new URLSearchParams({
      q: value,
      page: 1,
      per_page: 20,
  });

// const { debounce } = require("debounce");

  return fetch(`https://pixabay.com/api?key=35543000-cc8a37d4e982ce557296d34e8&${params}`)
    .then(Response => Response.json())
    .then(json => json.hits)
    .catch(err => console.log( error));
}

// const refs = {
//   input: document.querySelector('.input'),
//   result: document.querySelector('.result'),
//   more: document.querySelector('.more')
// }
// refs.input.addEventListener("input", debounce(inputValue, 1000));

// function inputValue(e) {
//   // const value = e.target.value.trim();
  
//   const params = new URLSearchParams({
//       // q: value,
//       q: "car",
//       page: 1,
//       per_page: 20,
//   });

//     return fetch(`https://pixabay.com/api/?key=35542818-db0a564bafb06d3dd4571f809&${params}`)
//     .then(Response => Response.json())
//     .then(json => json.hits)
//     .then(data => {
//       return data;
//     })
//     .catch(error => console.error(error));
// }

// // inputValue().then(data => console.log(data));

// function createImg(data) {
//   const markUp = data.map(({pageURL, tags, likes, downloads}) => {
//     return `<li class="galleryItem">
//               <a class="gallery-link" href="${pageURL}">
//                 <img class="gallery-img" src="${pageURL}" alt="${tags}">
//                 <div class="info">${likes} ${downloads}</div>
//               </a>
//             </li>`
//     })
//   .join(' ')
//   refs.result.insertAdjacentHTML("beforeend", markUp)
//   return markUp
// };
//-------------------------------------------------------------------------------------------------
const { default: axios } = require('axios');
// const { debounce } = require('debounce');
import Notiflix from 'notiflix';

const Base_URL = 'https://pixabay.com/api/';
const API_KEY = '25303063-e3dfa67f3227afe1b77421770';
const http_parametrs = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=5`;

const refs = {
  input: document.querySelector('.q'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.button'),
};

let page = 1;

async function fetch(q = 'car', page = 1) {
  try {
    const fetch = await axios.get(
      `${Base_URL}?key=${API_KEY}&q=${q}&page=${page}${http_parametrs}`
    );
    const response = fetch.data;
    return response;
  } catch (error) {
    console.log(error.message);
  }
}
refs.input.addEventListener('input', debounce(onInput, 300));
refs.button.addEventListener('click', onClick);

async function render(data) {
  const markUp = data
    .map(({ comments, downloads, likes, webformatURL, tags }) => {
      return `<img src="${webformatURL}" alt="${tags}">
      <div>comments: ${comments} </div>
      <div>download: ${downloads}</div>
      <div> likes:${likes} </div>`;
    })
    .join(' ');

  return markUp;
}

async function onInput(e) {
  const value = e.target.value.trim();

  if (value === '') {
    refs.button.classList.add('is-hidden');
    refs.gallery.innerHTML = '';
    Notiflix.Notify.info('Введіть данні');
    return;
  }

  const data = await fetch(value);

  const markUp = await render(data.hits);
  Notiflix.Notify.info(
    `Ура ми знайшли  ${data.total} картинку за вашим запитом`
  );

  if (markUp !== '') {
    refs.button.classList.remove('is-hidden');
  }

  refs.gallery.insertAdjacentHTML('beforeend', markUp);
}

async function onClick(e) {
  // page = page + 1;
  const value = refs.input.value.trim();
  page += 1;

  const data = await fetch(value, page);

  const images = data.total - page * 5;

  // Тернарний оператор

  // images <= 0
  // ? Notiflix.Notify.info(`Нажаль картинки завершились`)
  // : Notiflix.Notify.info(
  //     `Ура ми знайшли  ${images} картинку за вашим запитом`
  //   );

  if (images <= 0) {
    refs.button.classList.add('is-hidden');
    Notiflix.Notify.info(`Нажаль картинки завершились`);
  } else {
    Notiflix.Notify.info(`Ура ми знайшли  ${images} картинку за вашим запитом`);
  }

  const markUp = await render(data.hits);

  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', markUp);
}

// fetch(
//   'https://pixabay.com/api/?key=25303063-e3dfa67f3227afe1b77421770&q=car&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1'
// )
//   .then(response => response.json())
//   .then(res => console.log(res))
//   .catch(err => console.log(err));
//-------------------------------------------------------------------------------------------------
// const refs = {
//   input: document.querySelector('.input'),
//   result: document.querySelector('.result'),
//   more: document.querySelector('.more')
// }
// refs.input.addEventListener("input", debounce(inputValue, 1000));

// function inputValue(e) {
//   const value = e.target.value.trim();
  
//   const params = new URLSearchParams({
//       q: value,
//       page: 1,
//       per_page: 20,
//   });

//     return fetch(`https://pixabay.com/api/?key=35542818-db0a564bafb06d3dd4571f809&${params}`)
//     .then(Response => Response.json())
//     .then(json => json.hits)
//     .then(data => {
//       createImg(data); // викликаємо функцію створення розмітки з отриманими даними
//       return data;
//     })
//     // .then(data => {
//     //   onClick(data); // викликаємо функцію створення розмітки з отриманими даними
//     //   return data;
//     // })
//     .catch(error => console.error(error));
// }

// function createImg(data) {
//   const markUp = data.map(({pageURL, tags, likes, downloads}) => {
//     return `<li class="galleryItem">
//               <a class="gallery-link" href="${pageURL}">
//                 <img class="gallery-img" src="${pageURL}" alt="${tags}">
//                 <div class="info">${likes} ${downloads}</div>
//               </a>
//             </li>`
//     })
//   .join(' ')
//   refs.result.insertAdjacentHTML("beforeend", markUp)
//   return markUp
// }


// let page = 1;
// const dataLimit = 20;


// refs.more.addEventListener("click", onClick);
//-------------------------------------------------------------------------------------------------
// async function onClick (e, data) {
//     const pageLimit = 500 / dataLimit;
//     page += 1;
//     if (page <= pageLimit) {
//         const tata = await data(page);
//         createImg(tata);
//     } else {
//         refs.more.getElementsByClassName.display = "none";
//     }  
// };
