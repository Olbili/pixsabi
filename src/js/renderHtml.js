import { galleryItems } from './imgs';
import { pageURL } from './pagination';


// function createLi(email, password) {
//   const markup = `<li> Email: ${email}, Password: ${password}</li>`;
//   return markup;
// }

// function createLiFromStorage(VALUES_KEY) {
//   if (localStorage.getItem(VALUES_KEY)) {
//     const values = localStorage.getItem(VALUES_KEY);
//     const parseValue = JSON.parse(values);

//     const item = parseValue
//       .map(({ email, password }) => {
//         const markupMap = `<li> Email: ${email}, Password: ${password}</li>`;

//         return markupMap;
//       })
//       .join(' ');
//     return item;
//   }
//   console.log(item);
// }

function createLiImg(pageURL) {
  if (filterValue) {
    return priceItems
      .map(({ preview, original, description }) => {
        return `<li class="priceItem">
              <a class="price-link" href="${original}">
                <img class="price-img" src="${preview}" alt="${description}" data-sourse="${original}"  >
              </a>
            </li>`;
      })
      .join(' ');
  }

  // return priceItems
  //   .map(({ preview, original, description }) => {
  //     return `<li class="priceItem">
  //             <a class="price-link" href="${original}">
  //               <img class="price-img" src="${preview}" alt="${description}" data-sourse="${original}"  >
  //             </a>
  //           </li>`;
  //   })
  //   .join(' ');
}


// function createCountrys(countrys) {
//   const markUp = countrys
//     .map(
//       ({ name, capital, flags }) =>
//         `<li class="">
//         <p> <img src="${flags.png}" alt="${flags.alt}" width="30"> ${name.common}</p>
//    <p>${capital}</p>
//    </li>`
//     )
//     .join(' ');

//   return markUp;
// }

// function createCountry(country) {
//   const markUp = country
//     .map(
//       ({ currencies, population, languages }) => `<div class="">
//     <p>currencies --->  ${[...Object.keys(currencies)]} </p>
//     <p>population --->  ${population} </p>
//     <p>languages --->  ${[...Object.values(languages)]} </p>
//  </div>`
//     )
//     .join(' ');

//   return markUp;
// }

export {
  createLi,
  createLiFromStorage,
  createLiImg,
  createFilters,
  createCountrys,
  createCountry,
};


const refs = {
  input: document.querySelector('.input'),
  result: document.querySelector('.result'),
  more: document.querySelector('.more')
}
refs.input.addEventListener("input", debounce(inputValue, 1000));

function inputValue(e) {
  // const value = e.target.value.trim();
  
  const params = new URLSearchParams({
      // q: value,
      q: "car",
      page: 1,
      per_page: 20,
  });

    return fetch(`https://pixabay.com/api/?key=35542818-db0a564bafb06d3dd4571f809&${params}`)
    .then(Response => Response.json())
    .then(json => json.hits)
    .then(data => {
      return data;
    })
    .catch(error => console.error(error));
}
// .then(data => {
//             createImg(data); // викликаємо функцію створення розмітки з отриманими даними
//             return data;
//           })

// inputValue().then(data => console.log(data));

function createImg(data) {
  const markUp = data.map(({pageURL, tags, likes, downloads}) => {
    return `<li class="galleryItem">
              <a class="gallery-link" href="${pageURL}">
                <img class="gallery-img" src="${pageURL}" alt="${tags}">
                <div class="info">${likes} ${downloads}</div>
              </a>
            </li>`
    })
  .join(' ')
  refs.result.insertAdjacentHTML("beforeend", markUp)
  return markUp
};
