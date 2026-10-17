let showForm = document.getElementById("show-form");
let castForm = document.getElementById("show-cast");
const castResults = document.getElementById("cast-results");
showForm.addEventListener("submit", handleShowSubmit);
let userShows;

let arrayId = [];

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
    userShows = shows;
    console.log(userShows);
    console.log(shows);

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
    arrayId.push(shows[count].show.id);

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
  console.log(arrayId);
}

castResults.addEventListener("click", handleCastSubmit);
async function handleCastSubmit(event) {
  event.preventDefault();

  try {
    const casts = await getCastForShows(arrayId);
    console.log("Here is the casts", casts);
  } catch (error) {
    console.error("Could not get casts ", error);
  }
}

async function getCastForShows(ids) {
  const casts = [];
  for (let i = 1; i < ids.length; i++) {
    const response = await fetch(`https://api.tvmaze.com/shows/${ids[i]}/cast`);
    const cast = await response.json();
    casts.push(cast);
  }
  return casts;
}
