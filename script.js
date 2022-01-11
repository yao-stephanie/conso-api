let Search = document.querySelector(".imag");
let text = document.querySelector("#formulaire");
let card = document.querySelector("#card");
let saisi = document.querySelector("#input");
let liens = document.querySelector("#lien");
let affiche = document.querySelector(".card-text");
let afficheDate = document.querySelector(".text-date");
let apikey = "7843f8d22a43911f15301ef8d76338ae";

let numberItems = 8;
let fist = 0;

// fetch(
//   `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`
// )
//   .then((diffuser) => diffuser.json())
//   .then((data) => DisplayMovie(data));

// Search.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(saisi.value);
//   if (saisi.value) {
//     fetch(
//       `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${saisi.value}`
//     )
//       .then((rep) => rep.json())
//       .then((data) => {
//         Displaymovie(data.results);
//       });
//   } else {
//     alert("indisponible");
//   }
// });

// function Displaymovie(data) {
//   card.innerHTML = "";
//   if (data.length != 0) {
//     for (let i = 0; i < data.length; i++) {
//       card.innerHTML += `
//             <div class="card-group col-md-4">
//         <div class="card">
//           <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" class="card-img-top" alt="image1">
//           <div class="card-body">
//             <h5 class="card-title">${data[i].title}</h5>
//             <p class="card-text">${data[i].overview}</p>
//           </div>
//         </div>
//         </div>
//             `;
//     }
//   }
// }

axios
  .get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`
  )
  .then((diffuser) => DisplayMovie(diffuser));

text.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(saisi.value);
  if (saisi.value) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${saisi.value}`
      )
      .then((rep) => DisplayMovie(rep))
      .catch((error) => console.log("une erreur" + error));
  } else {
    alert("indisponible");
  }
});

text.addEventListener("keyup", (e) => {
  e.preventDefault();
  console.log(saisi.value);
  if (saisi.value) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${saisi.value}`
      )
      .then((rep) => DisplayMovie(rep))
      .catch((error) => console.log("une erreur" + error));
  } else {
    alert("indisponible");
  }
});

function page1() {
  console.log("cool");
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`
    )
    .then((resp) => DisplayMovie(resp));
}

function page2() {
  console.log("cool");
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=2`
    )
    .then((resp) => DisplayMovie(resp));
}

function page3() {
  console.log("cool");
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=3`
    )
    .then((resp) => DisplayMovie(resp));
}

let ajout = 3;
function Next() {
  ajout++;
  console.log("ajout");
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${ajout}`
    )
    .then((resp) => DisplayMovie(resp));
}

let diminue = -1;
function prevew() {
  diminue--;
  console.log("ajout");
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${diminue}`
    )
    .then((resp) => DisplayMovie(resp));
}

function DisplayMovie(data) {
  card.innerHTML = "";
  let info = data.data.results;
  // console.log(info)
  if (info.length != 0) {
    for (let i = 0; i < info.length; i++) {
      card.innerHTML += `
            <div class="card-group col-3">
        <div class="card" onclick="DisplayMo(${info[i].id})">
          <img src="https://image.tmdb.org/t/p/w500${info[i].poster_path}" class="card-img-top" alt="image1">
          <div class="card-body">
            <a href="#" id="lien">
            <h5 class="card-title">${info[i].title}</h5>
            </a>
            <p class="card-text" style ="display:none">${info[i].overview}</p>
            <p class="text-date" style = "display:none" style = "color:red">${info[i].release_date}</p>
          </div>
        </div>
        </div>
            `;
    }
  }
}

function DisplayMo(id) {
  console.log(id);
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
    .then((repon) => repon.json())
    .then((data) => {
      console.log(data);
      card.innerHTML = `

    <div class="bloc col-4">
    <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="card-img-top" alt="image1">
    <div class="card-body">
             <a href="information.html">
             <h5 class="card-title">${data.title}</h5>
             </a>
             <p class="card-text" style ="display:block">${data.overview}</p>
             <p class="text-date" style = "display:block" style = "color:red">${data.release_date}</p>
           </div>
    </div>
   `;
    });
}

function loadPage() {
  let page = 1;

  window.addEventListener("scroll", (e) => {
    //console.log(scrollY)

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let defiler = scrollHeight - clientHeight;

    if (scrollY == defiler) {
      page++;

      fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${page}`
        )
        .then((resp) => resp.json())
        .then(data =>{
          let ElementData = data.results

          for (let i = 0; i < ElementData.length; i++) {
            card.innerHTML += `
                  <div class="card-group col-3">
              <div class="card" onclick="DisplayMo(${ElementData[i].id})">
                <img src="https://image.tmdb.org/t/p/w500${ElementData[i].poster_path}" class="card-img-top" alt="image1">
                <div class="card-body">
                  <a href="#" id="lien">
                  <h5 class="card-title">${ElementData[i].title}</h5>
                  </a>
                  <p class="card-text" style ="display:none">${ElementData[i].overview}</p>
                  <p class="text-date" style = "display:none" style = "color:red">${ElementData[i].release_date}</p>
                </div>
              </div>
              </div>
                  `;
          }
        })
      
    }
  });
}

// loadPage();

let timeOut;
function attente (){
  timeOut = window.setTimeout(loadPage,1000)
}

attente ();
