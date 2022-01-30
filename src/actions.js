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
                type: 'getPopularMovies',
                payload: popularMovies
            })
        }

    } catch (error) {
        console.log(error)
    }    
}

export const getUpcomingMovies = () => {
    try {
        return async dispatch => {
            const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json());
            const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())

            let upcomingMovies = []
            for (let i = 0; i < 10; i++) {
                upcomingMovies[i] = response.results[i]
                upcomingMovies[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
                upcomingMovies[i].genre = ''
                for (let j = 0; j < genres.genres.length; j++) {
                    for (let z = 0; z < genres.genres.length; z++) {
                        if (upcomingMovies[i].genre_ids[j] == genres.genres[z].id) {
                            upcomingMovies[i].genre += genres.genres[z].name + (j != upcomingMovies[i].genre_ids.length - 1 ? ', ' : '')
                        }
                    }
                }
            }
            
            for (let i = 0; i < upcomingMovies.length; i++) {
                try {
                    var trailer = await fetch(`https://api.themoviedb.org/3/movie/${upcomingMovies[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                    for (let j = 0; j < trailer.results.length; j++) {
                        if (trailer.results[j].type == "Trailer") {
                            upcomingMovies[i].video = trailer.results[j].key
                            break
                        }
                    }
                } catch (error) {
                    console.log("No video found!")
                }
            }
            
            for (let i = 0; i < upcomingMovies.length; i++) {
                try {
                    var cast = await fetch(`https://api.themoviedb.org/3/movie/${upcomingMovies[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                    upcomingMovies[i].cast = []
                    for (let j = 0; j < 10; j++) {
                        upcomingMovies[i].cast[j] = cast.cast[j]
                        if (upcomingMovies[i].cast[j].profile_path == null || upcomingMovies[i].cast[j].profile_path == undefined) {
                            upcomingMovies[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                        } else {
                            upcomingMovies[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + upcomingMovies[i].cast[j].profile_path
                        }
                    }
                } catch (error) {
                    console.log('Cast fetch failed!')
                }
                
            }

            dispatch( {
                type: 'getUpcomingMovies',
                payload: upcomingMovies
            })
        }
	}catch (error) {
        console.log(error)
    }  
}

export const getMoviesByReleaseYear = () => {
    try {
        return async dispatch => {
            const currentYear = new Date().getFullYear()
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${currentYear}&api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json());
            const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())

            let moviesByReleaseYear = []
            for (let i = 0; i < 10; i++) {
                moviesByReleaseYear[i] = response.results[i]
                moviesByReleaseYear[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
                moviesByReleaseYear[i].genre = ''
                for (let j = 0; j < genres.genres.length; j++) {
                    for (let z = 0; z < genres.genres.length; z++) {
                        if (moviesByReleaseYear[i].genre_ids[j] == genres.genres[z].id) {
                            moviesByReleaseYear[i].genre += genres.genres[z].name + (j != moviesByReleaseYear[i].genre_ids.length - 1 ? ', ' : '')
                        }
                    }
                }
            }
            
            for (let i = 0; i < moviesByReleaseYear.length; i++) {
                try {
                    var trailer = await fetch(`https://api.themoviedb.org/3/movie/${moviesByReleaseYear[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                    for (let j = 0; j < trailer.results.length; j++) {
                        if (trailer.results[j].type == "Trailer") {
                            moviesByReleaseYear[i].video = trailer.results[j].key
                            break
                        }
                    }
                } catch (error) {
                    console.log("No video found!")
                }
            }
            
            for (let i = 0; i < moviesByReleaseYear.length; i++) {
                try {
                    var cast = await fetch(`https://api.themoviedb.org/3/movie/${moviesByReleaseYear[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                    moviesByReleaseYear[i].cast = []
                    for (let j = 0; j < 10; j++) {
                        moviesByReleaseYear[i].cast[j] = cast.cast[j]
                        if (moviesByReleaseYear[i].cast[j].profile_path == null || moviesByReleaseYear[i].cast[j].profile_path == undefined) {
                            moviesByReleaseYear[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                        } else {
                            moviesByReleaseYear[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + moviesByReleaseYear[i].cast[j].profile_path
                        }
                    }
                } catch (error) {
                    console.log('Cast fetch failed!')
                }
            }
            
            dispatch( {
                type: 'getMoviesByReleaseYear',
                payload: moviesByReleaseYear
            })
        }
    }catch(err){
        console.log(error)
    }
}

export const getPopularTvShows = () => {
    try {
        return async dispatch => {
            const response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json());

            let popularTvShows = []
            for (let i = 0; i < 10; i++) {
                popularTvShows[i] = response.results[i]
                popularTvShows[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
                popularTvShows[i].genre = ''

                const movie = await fetch(`https://api.themoviedb.org/3/tv/${popularTvShows[i].id}?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json());
                for (let j = 0; j < movie.genres.length; j++) {
                    popularTvShows[i].genre += movie.genres[j].name + (j != movie.genres.length - 1 ? ', ' : '')
                }
            }

            for (let i = 0; i < popularTvShows.length; i++) {
                try {
                var trailer = await fetch(`https://api.themoviedb.org/3/tv/${popularTvShows[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                for (let j = 0; j < trailer.results.length; j++) {
                        if (trailer.results[j].type == "Trailer") {
                            popularTvShows[i].video = trailer.results[j].key
                            break
                        }
                    }
                } catch (error) {
                    console.log('Video fetch -> error.status_message: ' + error.status_message)
                }
            }

            for (let i = 0; i < popularTvShows.length; i++) {
                try{
                    var cast = await fetch(`https://api.themoviedb.org/3/tv/${popularTvShows[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                    popularTvShows[i].cast = []
                    for (let j = 0; j < 10; j++) {
                        popularTvShows[i].cast[j] = cast.cast[j]
                        if (popularTvShows[i].cast[j].profile_path == null) {
                            popularTvShows[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                        } else {
                        popularTvShows[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + popularTvShows[i].cast[j].profile_path
                        }
                    }
                } catch (error) {
                    console.log('Cast fetch failed!')
                }
            }        

            dispatch( {
                type: 'getPopularTvShows',
                payload: popularTvShows
            })
    
        }
    }catch(err){
        console.log(error)
    }
}
