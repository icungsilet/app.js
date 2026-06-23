const BASE = "https://vxz.megadon8787.workers.dev";
const IMG = "https://image.tmdb.org/t/p/original";

let page = 1;
let loading = false;

// HERO
async function loadHero() {
  const res = await fetch(`${BASE}/trending/movie/day`);
  const data = await res.json();

  const movie = data.results[0];

  const hero = document.getElementById("hero");
  hero.style.backgroundImage =
    `url(${IMG + movie.backdrop_path})`;

  hero.innerHTML = `<h1>${movie.title}</h1>`;
}

// MOVIES
async function loadMovies() {
  if (loading) return;
  loading = true;

  const res = await fetch(`${BASE}/movie/popular?page=${page}`);
  const data = await res.json();

  const container = document.getElementById("movies");

  data.results.forEach(m => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${IMG + m.poster_path}">
    `;

    div.onclick = () => {
      location.href = `detail.html?id=${m.id}`;
    };

    container.appendChild(div);
  });

  page++;
  loading = false;
}

// INFINITE SCROLL
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    loadMovies();
  }
});

// SEARCH
document.getElementById("search")
  .addEventListener("keyup", async (e) => {

  const q = e.target.value;
  if (!q) return;

  const res = await fetch(`${BASE}/search/movie?query=${q}`);
  const data = await res.json();

  const container = document.getElementById("movies");
  container.innerHTML = "";

  data.results.forEach(m => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `<img src="${IMG + m.poster_path}">`;

    container.appendChild(div);
  });
});

loadHero();
loadMovies();
