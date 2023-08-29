const API_PATH = '//api.themoviedb.org/3'
const ImageURL = '//image.tmdb.org/t/p/original'
const API_KEY = '835e14c83deaad70730e723e333fe11c'

let html = "";
let Page = 1;

let Peliculas;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzVlMTRjODNkZWFhZDcwNzMwZTcyM2UzMzNmZTExYyIsInN1YiI6IjY0ZWI5ZjkzNDU4MTk5MDExZDJiYWZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h5BnD7izsFV35t8eF5Ywu2hiGwQBgeHi5B-oWrzXK78'
  }
};

function CargarPeliculas(){
  /*
  fetch(`${API_PATH}/discover/movie/?api_key=${API_KEY}&page=${Page}`)
  .then(response => response.json())
    .then(function(data){
      AgregarPeliculas(data.results)
    })
    .catch(error => console.log('Error: ',error));
*/
    
    fetch(`https://api.themoviedb.org/3/discover/movie?page=${Page}&sort_by=popularity.desc`, options)
      .then(response => response.json())
      .then(function(data){
        AgregarPeliculas(data.results)
      })
      .catch(err => console.error(err));
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