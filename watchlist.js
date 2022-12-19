
const searchBox = document.getElementById('search-box')
const mainEl = document.getElementById("main")
let storageArr = []

Object.keys(localStorage).forEach(function (key) {
	storageArr.push(JSON.parse(localStorage.getItem(key)))
})

function renderHtml(){

    if(localStorage.length !== 0) {
        mainEl.innerHTML = ""
        storageArr.map((movie) => {
            mainEl.innerHTML += `
            <div class="container">
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="${movie.poster}">
                    </div>
                    <div class="movie-info">
                        <div class="movie-title">
                            <h5>${movie.title}</h5>
                            <h6>⭐ ${movie.imdbrating}</h62>
                        </div>
                        <div class="movie-properties">
                            <h6>${movie.runtime}</h6>
                            <h6>${movie.genre}</h6>
                            <button 
                                id="watchlist-btn"
                                data-imdbID="${movie.imdbid}"
                                data-Poster="${movie.poster}"
                                data-title="${movie.title}"
                                data-imdbRating="${movie.imdbrating}"
                                data-Runtime="${movie.runtime}"
                                data-Genre="${movie.genre}"
                                data-Plot="${movie.plot}"
                                >
                                <i class="fa-solid fa-circle-minus"></i>
                                Remove
                                </button>
                        </div>
                        <div class="movie-description">
                            <h6>${movie.plot}</h6>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>
            `
            })
    } else {
        mainEl.innerHTML = `
        <div class="start-container">
            <h6 class="empty">Your watchlist is looking a little empty...</h6>
            <div class="add-wrapper">
                <div class="i-tag">
                    <i class="fa-solid fa-circle-plus"></i>
                </div>
                <h6 id="add-movie" class="add-movie">Let’s add some movies!</h6>
            </div>
        </div>
        `
    } 
}


function handleWatchList(e){
    storageArr = []

    localStorage.removeItem(e.target.dataset.imdbid)

    Object.keys(localStorage).forEach(function (key) {
        storageArr.push(JSON.parse(localStorage.getItem(key)))
    })

    renderHtml()
}

document.body.addEventListener('click', (e)=>{
    e.preventDefault()
    if(e.target.id === 'watchlist-btn') {
		handleWatchList(e)
	} else if (e.target.id === "home" || e.target.id === "add-movie") {
		window.open("index.html", "_self")
	} 
})

renderHtml()