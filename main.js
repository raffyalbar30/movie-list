const inputSerch = document.querySelector("input");
const serchButton = document.querySelector("button");
const view = document.querySelector("#viewhome");


// fungsi getrequest ke api

 function loadDataMovie(query) {
      fetch(`http://www.omdbapi.com/?apikey=5224a96&s=${query}`)
      .then(response => response.json())
      .then( data => {
            if (data.Response == "True") {
                  displayResluts(data.Search)
            } else{
                view.innerHTML = `<p>${data.Error}</p>`
            }
      })
      .catch(error => {
        console.error("Terjadi kesalahan:", error);
      });
 }

 // tampilkan semua 
 function displayResluts(movies) {
     movies.forEach(movie => {
        let cards = createCards(movie)
        view.insertAdjacentHTML('afterbegin', cards)
     });
 }

//  create element untuk movie

function createCards(movie) {
     let card = `
     <div class="p-4 m-8 w-80 bg-white shadow-md rounded-xl">
     <picture class="rounded-lg block overflow-hidden">
       <img
         class="hover:scale-125"
         src="${movie.Poster}"
       />
     </picture>
   
     <h1 class="mt-4 mb-2 text-xl font-bold">${movie.Title}</h1>
     <p class="text-lg text-gray-600">
          ${movie.Year}
     </p>
     <p class="text-xl font-semibold">${movie.Type}</p>
   </div>
     `

     return card;
}

serchButton.addEventListener("click", function () {
  const query = inputSerch.value;
  if (query) {
    loadDataMovie(query);
  }
})