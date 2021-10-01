const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let isLoadingFinished = false;
let loadedImagesCount = 0;
let totalImages = 0;
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const photoOrientation = "landscape";
const apiKey = "your_access_key";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}&orientation=${photoOrientation}`;

const updateAPIURLWithNewCount = function (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&orientation=${photoOrientation}`;
};

// Set multiple attributes to an element
const setAttributes = function (element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Check if all images were loaded
const imageLoaded = function () {
  loadedImagesCount++;

  if (loadedImagesCount === totalImages) {
    isLoadingFinished = true;

    // Hide Loader when done image loading
    loader.hidden = true;
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
    img.addEventListener("load", imageLoaded);

    link.appendChild(img);
    imageContainer.appendChild(link);
  });
};

const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    displayPhotos(photosArray);

    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (err) {
    alert("Sorry. Something went wrong.");
    console.log(`Cannot fetch photo. ${err}`);
  }
};

// Load more photos when scroll near the bottom of page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 1000 &&
    isLoadingFinished
  ) {
    isLoadingFinished = false;
    getPhotos();
  }
});

// On Load
// getPhotos();
