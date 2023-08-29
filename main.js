const API_PATH = 'https://api.themoviedb.org/3'
const ImageURL = 'https://image.tmdb.org/t/p/original'
const API_KEY = '835e14c83deaad70730e723e333fe11c'

let html = "";
let Page = 1;

let Peliculas;

function CargarPeliculas(){
  fetch(`${API_PATH}/discover/movie/?api_key=${API_KEY}&page=${Page}`)
  .then(response => response.json())
    .then(function(data){
      AgregarPeliculas(data.results)
    });
}

function AgregarPeliculas(data){
  console.log(data);
  for (let i = 0; i < data.length; i++) {
      html += `
      <h2>${data[i].title}</h2>
      <img src="${ImageURL + data[i].poster_path}" alt="">
      <p>${data[i].overview}</p>
      `;
    document.getElementById('prueba').innerHTML = html
  }
  Page += 1;
}

document.getElementById('boton').onclick = function(){
  CargarPeliculas();
}

CargarPeliculas();