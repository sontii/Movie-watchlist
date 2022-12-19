const apiKey = 'd0b6a0ba'
const searchBox = document.getElementById('search-box')
const mainEl = document.getElementById("main")

async function handleSearch() {
    mainEl.innerHTML =''
    const searchParam = searchBox.value.replace(/ /g, "+")
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s='${searchParam}'`)
    const data = await res.json()
    if (data.Response  === 'True') {
        data.Search.map(async (movieId) => {
            const listRes = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId.imdbID}`
            )
            const movie = await listRes.json()
            let wathced = isWatched(movie.imdbID)
            mainEl.innerHTML += `
            <div class="container">
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="${movie.Poster}">
                    </div>
                    <div class="movie-info">
                        <div class="movie-title">
                            <h5>${movie.Title}</h5>
                            <h6>⭐ ${movie.imdbRating}</h62>
                        </div>
                        <div class="movie-properties">
                            <h6>${movie.Runtime}</h6>
                            <h6>${movie.Genre}</h6>
                            <button 
                                id="watchlist-btn"
                                data-imdbID="${movie.imdbID}"
                                data-Poster="${movie.Poster}"
                                data-title="${movie.Title}"
                                data-imdbRating="${movie.imdbRating}"
                                data-Runtime="${movie.Runtime}"
                                data-Genre="${movie.Genre}"
                                data-Plot="${movie.Plot}"
                                >
                                <i 
                                class="fa-solid
                                fa-circle-${wathced ? "minus" : "plus"}"
                                >
                                </i>
                                ${wathced ? "Remove" : "Watchlist"}
                                </button>
                        </div>
                        <div class="movie-description">
                            <h6>${movie.Plot}</h6>
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
                <p>Unable to find what you’re looking for. Please try another search.</p>
            </div>
            `
        }
    searchBox.value = ''
}


function isWatched(id){
    if(JSON.parse(localStorage.getItem(id))){
        return true
    } else {
        return false
    }
}


function handleWatchList(e){
    
    let isIn = isWatched(e.target.dataset.imdbid)

    let watchItem = {
        title: e.target.dataset.title,
        poster: e.target.dataset.poster,
        imdbid: e.target.dataset.imdbid,
        imdbrating: e.target.dataset.imdbrating,
        runtime: e.target.dataset.runtime,
        genre: e.target.dataset.genre,
        plot: e.target.dataset.plot,
    }

    if(isIn){
        localStorage.removeItem(watchItem.imdbid)
    } else {
        localStorage.setItem(watchItem.imdbid, JSON.stringify(watchItem))
    }

    e.target.innerHTML = `<i class="fa-solid fa-circle-${isIn ? 'plus' : 'minus'}"></i> Watchlist`
}

document.body.addEventListener('click', (e)=>{
    e.preventDefault()
    if(e.target.id === 'search-btn'){
        handleSearch()
    } else if (e.target.id === 'watchlist-btn') {
		handleWatchList(e)
	} else if (e.target.id === "watchlist") {
		window.open("watchlist.html", "_self")
	}
})