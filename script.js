let showForm = document.getElementById("show-form");

showForm.addEventListener("submit", handleShowSubmit);

async function handleShowSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const show = formData.get("show");
  const limit = formData.get("limit");

  const apiUrl = new URL("https://api.tvmaze.com/search/shows");
  apiUrl.searchParams.append("q", show);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const shows = await response.json();
    console.log(shows);
    console.log(shows[2].show.name);
    const a = shows[2].show.summary;
    console.log(a);

    displayShows(shows);
  } catch {
    console.error("Error fetching shows: ", error);
  }
}

function displayShows(shows) {
  const showRes = document.getElementById("show-results");
  let ul = document.createElement("ul");
  showRes.appendChild(ul);
  let count = 0;
  shows.forEach((show) => {
    const li = document.createElement("li");
    const sumLi = document.createElement("li");
    const dateLI = document.createElement("li");
    const endedLI = document.createElement("li");

    li.textContent = shows[count].show.name;
    sumLi.innerHTML = shows[count].show.summary;
    dateLI.textContent = shows[count].show.premiered;
    endedLI.textContent = shows[count].show.ended;
    ul.appendChild(li);
    ul.appendChild(sumLi);
    ul.appendChild(dateLI);
    ul.appendChild(endedLI);
    count = count + 1;
  });
}
