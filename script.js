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
  } catch {
    console.error("Error fetching shows: ", error);
  }
}
