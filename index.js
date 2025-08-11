// look back at the <readme.md> file for some hints //
// working API key //
const CONFIG = {
  GIPHY_API_KEY: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
  GIPHY_API_URL: "http://api.giphy.com/v1/gifs/search",
};

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gifContainer = document.getElementById("gif-container");
const clearGifsButton = document.getElementById("clear-gifs-button");

/**
 * Fetches data for a random GIF from the Giphy API.
 * @param {string} searchTerm - The term to search for.
 * @returns {Promise<{data: object|null, error: string|null}>} An object with gif data or an error message.
 */
async function fetchRandomGifData(searchTerm) {
  try {
    const response = await axios.get(CONFIG.GIPHY_API_URL, {
      params: { api_key: CONFIG.GIPHY_API_KEY, q: searchTerm },
    });

    const gifs = response.data.data;
    if (gifs.length === 0) return { data: null, error: null };

    const randomIndex = Math.floor(Math.random() * gifs.length);
    const randomGif = gifs[randomIndex];

    const data = {
      url: randomGif.images.original.url,
      width: Number(randomGif.images.original.width),
      height: Number(randomGif.images.original.height),
    };
    return { data, error: null };
  } catch (error) {
    console.error("API Request Failed:", error);
    return {
      data: null,
      error: "Failed to fetch GIF. Please try again later.",
    };
  }
}

/**
 * Creates a GIF element with a loading spinner.
 * @param {object} gifData - An object containing { url, width, height }.
 * @returns {HTMLElement} The fully constructed gif wrapper element.
 */
function createGifElement({ url, width, height }) {
  const gifWrapper = document.createElement("div");
  gifWrapper.classList.add("gif-wrapper", "gif-wrapper--loading");

  if (width > 0) {
    gifWrapper.style.aspectRatio = `${width} / ${height}`;
  }

  const loader = document.createElement("div");
  loader.className = "loader";
  gifWrapper.appendChild(loader);

  const gifImg = document.createElement("img");
  gifImg.addEventListener("load", () => {
    gifWrapper.removeChild(loader);
    gifWrapper.classList.remove("gif-wrapper--loading");
  });
  gifImg.src = url;

  gifWrapper.appendChild(gifImg);
  return gifWrapper;
}

/**
 * Handles the form submission, orchestrating the fetch and DOM update.
 * @param {Event} event - The form submission event.
 */
async function handleSearchSubmit(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim(); // Trim whitespace
  if (!searchTerm) return;

  const { data, error } = await fetchRandomGifData(searchTerm);

  if (error) {
    alert(error);
  } else if (data) {
    const gifElement = createGifElement(data);
    gifContainer.appendChild(gifElement);
  } else {
    alert("No GIFs found for that search term.");
  }
}

// Event Listeners
searchForm.addEventListener("submit", handleSearchSubmit);

// Event listener for the "Clear GIFs" button
clearGifsButton.addEventListener("click", () => (gifContainer.innerHTML = ""));
