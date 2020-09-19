function githubProjectLink() {
  const projectName = 'infinite-scrolling';
  const githubUrl = 'https://github.com/meleu/js-practice/tree/master';
  window.open(`${githubUrl}/${projectName}`, '_blank');
}

const github = document.querySelector('#github-link');
github.addEventListener('click', githubProjectLink);


const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let isReady = false;
let imagesLoadedAmount = 0;
let imagesLoadedTotalAmount = 0;
let imagesPage = 1;

function imageLoaded() {
  imagesLoadedAmount++;
  if (imagesLoadedAmount === imagesLoadedTotalAmount) {
    isReady = true;
    loader.hidden = true;
    imagesPage++;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for photos and add them to the DOM
function displayPhotos(photos) {
  imagesLoadedTotalAmount += photos.length;

  photos.forEach((photo) => {
    // create an <a>
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.url,
      target: '_blank'
    });

    // create an <img>
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.download_url,
      alt: `Photo by ${photo.author}`,
      title: `Photo by ${photo.author}`
    });

    img.addEventListener('load', imageLoaded);

    // putting <img> inside <a> and then both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

async function getPhotos(count) {
  try {
    const apiUrl = `https://picsum.photos/v2/list?page=${imagesPage}&limit=${count}`;
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    console.log(photosArray);
    displayPhotos(photosArray);
  } catch (error) {
    console.log(error);
  }
}

// if it's near the bottom of the page, load more photos
window.addEventListener('scroll', () => {
  if (isReady && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    isReady = false;
    getPhotos(20);
  }
});

console.log('carregando...')
getPhotos(5);
