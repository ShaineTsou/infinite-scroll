const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let loadingFinished = false;
let loadedImagesCount = 0;
let totalImages = 0;

// Unsplash API
let numOfRequestImages = 5;
const photoOrientation = "landscape";
const apiKey = "your_access_key";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numOfRequestImages}&orientation=${photoOrientation}`;

// Helper Function - set multiple attributes to an element
const setAttributes = function (element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const isImageLoaded = function () {
  loadedImagesCount++;

  if (loadedImagesCount === totalImages) {
    loadingFinished = true;

    // Hide Loader when done image loading
    loader.hidden = true;

    // After initial load, increase count to 30, update apiUrl
    numOfRequestImages = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numOfRequestImages}&orientation=${photoOrientation}`;
  }
};

const displayPhotos = function (photos) {
  totalImages = photos.length;

  // When requesting more images, reset loadedImagesCount
  loadedImagesCount = 0;

  photos.forEach((photo) => {
    const link = document.createElement("a");
    setAttributes(link, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: `${photo.alt_description || photo.description}`,
      title: `${photo.alt_description || photo.description}`,
    });
    img.addEventListener("load", isImageLoaded);

    link.appendChild(img);
    imageContainer.appendChild(link);
  });
};

const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    displayPhotos(photosArray);
  } catch (err) {
    alert("Sorry. Something went wrong.");
    console.log(`Cannot fetch photo. ${err}`);
  }
};

// Load more photos when scroll to the point of 1000px above the bottom of page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 1000 &&
    loadingFinished
  ) {
    loadingFinished = false;
    getPhotos();
  }
});

// On Load
// getPhotos();
