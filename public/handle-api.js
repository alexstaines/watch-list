//search show

function searchShow(query) {
  const url = `https://kitsu.io/api/edge/anime?filter%5Btext%5D=${query}`;
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const results = jsonData.data.map((show) => show.attributes.canonicalTitle);
      renderResults(results);
      document.getElementById("errorMsg").innerHTML = "";
    })
    .catch((error) => {
      document.getElementById("errorMsg").innerHTML = error;
      renderResults([]);
    });
}

function renderResults(results) {
  const list = document.getElementById("resultsList");
  list.innerHTML = "";
  results.forEach((result) => {
    const element = document.createElement("li");
    element.innerText = result;
    list.appendChild(element);
  });
}

let searchTimoutToken = 0;
window.onload = () => {
  const searchField = document.getElementById("searchField");
  searchField.onkeyup = (event) => {
    //every key press cancels previous keypress timeout
    clearTimeout(searchTimoutToken);

    if (searchField.value.trim().length === 0) return;

    searchTimoutToken = setTimeout(() => {
      searchShow(searchField.value);
    }, 250);
  };
};
