const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

// Unsplash API
const photoCount = 10;
const photoOrientation = "landscape";
const apiKey = "your_access_key";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}&orientation=${photoOrientation}`;

// Helper Function - set multiple attributes to an element
const setAttributes = function (element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = function (photos) {
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

getPhotos();
