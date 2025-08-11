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

    // Create and append the new GIF element
    const gifImg = document.createElement("img");
    gifImg.src = gifUrl;
    gifContainer.appendChild(gifImg);
  } catch (error) {
    console.error("API Request Failed:", error);
  }
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value;
  retrieveGif(searchTerm);
  searchInput.value = "";
});

// Event listener for the "Clear GIFs" button
clearGifsButton.addEventListener("click", () => (gifContainer.innerHTML = ""));
