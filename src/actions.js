export const getPopularMovies = () => {
    try {
        return async dispatch => {

            const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())
            const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())
            
            let popularMovies = []
            for (let i = 0; i < 5; i++) {
                popularMovies[i] = response.results[i]
                popularMovies[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
                popularMovies[i].genre = ''
                for (let j = 0; j < genres.genres.length; j++) {
                    for (let z = 0; z < genres.genres.length; z++) {
                        if (popularMovies[i].genre_ids[j] == genres.genres[z].id) {
                            popularMovies[i].genre += genres.genres[z].name + (j != popularMovies[i].genre_ids.length - 1 ? ', ' : '')
                        }
                    }
                }
            }
            
            for (let i = 0; i < popularMovies.length; i++) {
                try {
                    var trailer = await fetch(`https://api.themoviedb.org/3/movie/${popularMovies[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                    for (let j = 0; j < trailer.results.length; j++) {
                        if (trailer.results[j].type == "Trailer") {
                            popularMovies[i].video = trailer.results[j].key
                            break
                        }
                    }
                } catch (error) {
                    console.log("No video found!")
                }
            }

            for (let i = 0; i < popularMovies.length; i++) {
                try {
                    var cast = await fetch(`https://api.themoviedb.org/3/movie/${popularMovies[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                    popularMovies[i].cast = []
                    for (let j = 0; j < 10; j++) {
                        popularMovies[i].cast[j] = cast.cast[j]
                        if (popularMovies[i].cast[j].profile_path == null) {
                            popularMovies[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                        } else {
                            popularMovies[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + popularMovies[i].cast[j].profile_path
                        }
                    }
                } catch (error) {
                    console.log('Cast fetch failed!')
                }
            }

            dispatch( {
                type: 'fetchPopularMovies',
                payload: popularMovies
            })
        }

    } catch (error) {
        console.log(error)
    }    

}

