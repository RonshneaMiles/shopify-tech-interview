const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("loader");
const introduction = document.getElementById("introduction");
const content = document.getElementById("content");
let q;
let displayData = [];
let galleryData = [];

searchButton.addEventListener("click", () => {
  q = searchInput.value;
  introduction.style.display = "none";
  loader.style.display = "block";
  sendApiRequest();
});

async function sendApiRequest() {
  let response = await fetch(`https://images-api.nasa.gov/search?q=${q}`);
  console.log(response);

  let data = await response.json();
  console.log(data);
  displayApiData(data);
}

function displayApiData(data) {
  loader.style.display = "none";
  q = "";
  galleryData = data.collection.items;
  console.log(galleryData);

  galleryData.forEach(function (item) {
    if (item.data[0].media_type === "image") {
      displayData.push(item);
    }
  });
  console.log(displayData);
  const gallerySample = displayData.slice(0, 10);
  console.log(gallerySample);

  gallerySample.forEach((element) => {
    let contentCard = document.createElement("div");
    contentCard.classList.add("content-cards");
    let contentImage = document.createElement("img");
    let contentHeading = document.createElement("h2");
    let contentDescription = document.createElement("h4");
    let likeButton = document.createElement("button");
    likeButton.classList.add("unclicked");
    likeButton.innerText = "Like";
    contentHeading.innerHTML = element.data[0].title;
    contentDescription.innerHTML = element.data[0].date_created;
    contentImage.src = element.links[0].href;
    contentCard.append(contentImage);
    contentCard.append(contentHeading);
    contentCard.append(contentDescription);
    contentCard.append(likeButton);

    content.appendChild(contentCard);
    likeButton.addEventListener("click", () => {
      if (likeButton.classList.contains("unclicked")) {
        likeButton.innerText = "Liked!";
        likeButton.classList.remove("unclicked");
        likeButton.classList.add("clicked");
      } else {
        likeButton.innerText = "Like";
        likeButton.classList.remove("clicked");
        likeButton.classList.add("unclicked");
      }
    });
  });
}
