const API_PATH = "//api.themoviedb.org/3";
const ImageURL = "//image.tmdb.org/t/p/w500";
const ImageOriginalPATH = "//image.tmdb.org/t/p/original";
const API_KEY = "835e14c83deaad70730e723e333fe11c";
const AccessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVlMTRjODNkZWFhZDcwNzMwZTcyM2UzMzNmZTExYyIsInN1YiI6IjY0ZWI5ZjkzNDU4MTk5MDExZDJiYWZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h5BnD7izsFV35t8eF5Ywu2hiGwQBgeHi5B-oWrzXK78";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AccessToken}`,
  },
};

let html = "";
let Page = 1;

function CargarCarrusel() {
  fetch(`${API_PATH}/movie/top_rated?page=1`, options)
    .then((response) => response.json())
    .then(function (data) {
      AgregarSlide(data.results);
    })
    .catch((err) => console.error(err));
}

function AgregarSlide(data) {
  //console.log(data);
  let Carrusel = "";
  for (let i = 0; i < data.length; i++) {
    Carrusel += `
    <div class="carousel-item ${ i==0 ? "active" : ""}">
      <img src="${ImageOriginalPATH + data[i].backdrop_path}" class="d-block w-100 p-3" style="height: 55vh;" alt="${data[i].title}">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3">
        <h5>${data[i].title}</h5>
        <p>${data[i].overview}</p>
      </div>
    </div>
      `;
    document.getElementById("carousel-inner").innerHTML = Carrusel;
  }
}

function CargarPeliculas() {
  fetch(`${API_PATH}/discover/movie?page=${Page}`, options)
    .then((response) => response.json())
    .then(function (data) {
      AgregarPeliculas(data.results);
    })
    .catch((err) => console.error(err));
}

function AgregarPeliculas(data) {
  //console.log(data);
  for (let i = 0; i < data.length; i++) {
    html += `
    <a href="#" class="text-decoration-none">
      <h2 class="fs-4 text-white">${data[i].title}</h2>
      <img class="border border-3 border-danger rounded-3" src="${
        ImageURL + data[i].poster_path
      }" alt="${data[i].title}">
      </a>
      `;
    document.getElementById("prueba").innerHTML = html;
  }
  Page += 1;
}

document.getElementById("boton").onclick = function () {
  CargarPeliculas();
};

CargarCarrusel();
CargarPeliculas();
