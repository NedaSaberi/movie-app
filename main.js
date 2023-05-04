const URL =
  "https://api.themoviedb.org/3/trending/all/day?api_key=26c7b793e8b2b7b167286399defad751";
const IMG_PATH = "https://image.tmdb.org/t/p/original";
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=26c7b793e8b2b7b167286399defad751&query=";
const form = document.querySelector(".search-section");
const searchBox = document.querySelector("#search-box");
const container = document.querySelector(".container");


async function getMovie(){
  const request = await fetch(URL);
  const data = await request.json();
  showMovies(data.results)
};

async function getSearchedMovie(movieName){
    const searchUrl = SEARCH_URL + movieName;
  const request = await fetch(searchUrl);
  const data = await request.json();
  console.log(data.results);
  showMovies(data.results);
};

function showMovies(movies) {
    container.innerHTML= '';
    for(let i=0; i < movies.length; i++){
        let movieOfList = movies[i];
          let {name, title, vote_average, overview, backdrop_path} = movieOfList;
          let movie = document.createElement("div");
          movie.className = "movie";
          let color = rateColor(vote_average);
          movie.innerHTML = `
            <div class="header">
                    <img class="poster" src="${IMG_PATH + backdrop_path}" alt="">
                    <div class="shortInfo">
                        <div class="title">${name || title}</div>
                        <div class="rate ${color}">${vote_average}</div>
                    </div>
                </div>
                <div class="footer">
                    <div class="overview">Overview</div>
                    <p class="description">${overview}</p>
            </div>
          `;
          
          container.appendChild(movie);
    }
 }

getMovie();


      //   let header = document.createElement("div");
      //   header.className = "header";
      //   let poster = document.createElement("img");
      //   poster.className = "poster";
      //   let shortInfo = document.createElement("div");
      //   shortInfo.className = "shortInfo";
      //   let title = document.createElement("div");
      //   title.className = "title";
      //   let rate = document.createElement("div");
      //   rate.className = "rate";
      //   shortInfo.appendChild(title);
      //   shortInfo.appendChild(rate);
      //   header.appendChild(poster);
      //   header.appendChild(shortInfo);
      //   let footer = document.createElement("div");
      //   footer.className = "footer";
      //   let overview = document.createElement("div");
      //   overview.className = "overview";
      //   let description = document.createElement("p");
      //   description.className = "description";
      //   footer.appendChild(overview);
      //   footer.appendChild(description);
      //   movie.appendChild(header);
      //   movie.appendChild(footer);
      //   container.appendChild(movie);
    
        //assigning
      //   title.textContent = movieOfList.name || movieOfList.title;
      //   rate.textContent = movieOfList.vote_average;
      //   description.textContent = movieOfList.overview;
      //   let posterURL = IMG_PATH + movieOfList.backdrop_path;
      //   poster.setAttribute("src", posterURL);
     
        
   
    
  

form.addEventListener("submit", function (event) {
    let movieName = searchBox.value;
  
  if(movieName && movieName != ''){
    getSearchedMovie(movieName);
  }else{
    window.location.reload()
  }
  event.preventDefault();
});



  function rateColor(rate){
    if (rate > 7) {
        return "green"
      } else if (rate > 5) {
        return "orange"
      } else {
        return "red"
      }
  }