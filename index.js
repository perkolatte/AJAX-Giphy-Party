// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const GIPHY_API_URL = "http://api.giphy.com/v1/gifs/search";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gifContainer = document.getElementById("gif-container");
const clearGifsButton = document.getElementById("clear-gifs-button");

async function retrieveGif(searchTerm) {
  try {
    const response = await axios.get(GIPHY_API_URL, {
      params: {
        api_key: giphyApiKey,
        q: searchTerm,
      },
    });

    const gifs = response.data.data;
    if (gifs.length === 0) {
      alert("No GIFs found for that search term.");
      return;
    }

    // Select a random GIF from the results
    const randomIndex = Math.floor(Math.random() * gifs.length);
    const randomGif = gifs[randomIndex];
    const gifUrl = randomGif.images.original.url;
    const gifWidth = Number(randomGif.images.original.width);
    const gifHeight = Number(randomGif.images.original.height);

    // Create a wrapper div to handle rounded corners via clipping
    const gifWrapper = document.createElement("div");
    gifWrapper.classList.add("gif-wrapper");
    // Set aspect-ratio via inline style. This reserves space before the
    // image loads, preventing content layout shift and overlapping.
    if (gifWidth > 0) {
      gifWrapper.style.aspectRatio = `${gifWidth} / ${gifHeight}`;
    }

    // Create the image element
    const gifImg = document.createElement("img");
    gifImg.src = gifUrl;

    gifWrapper.appendChild(gifImg);
    gifContainer.appendChild(gifWrapper);
  } catch (error) {
    console.error("API Request Failed:", error);
  }
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value;
  retrieveGif(searchTerm);
});

// Event listener for the "Clear GIFs" button
clearGifsButton.addEventListener("click", () => (gifContainer.innerHTML = ""));
