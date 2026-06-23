const BASE = "https://vxz.megadon8787.workers.dev";
const IMG = "https://image.tmdb.org/t/p/original";

const id = new URLSearchParams(location.search).get("id");

async function loadDetail() {

  const res = await fetch(`${BASE}/movie/${id}`);
  const movie = await res.json();

  const vidRes = await fetch(`${BASE}/movie/${id}/videos`);
  const vids = await vidRes.json();

  const trailer = vids.results.find(v => v.type === "Trailer");

  document.getElementById("banner").style.backgroundImage =
    `url(${IMG + movie.backdrop_path})`;

  document.getElementById("content").innerHTML = `
    <h1>${movie.title}</h1>
    <p>${movie.overview}</p>

    ${
      trailer
        ? `<iframe src="https://www.youtube.com/embed/${trailer.key}?autoplay=1"></iframe>`
        : "No trailer"
    }
  `;
}

loadDetail();
