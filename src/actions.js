import { constants } from "./constants";

export const getPopularMovies = () => {
    try {
        return async dispatch => {
            const response = await fetch(`${constants.baseUrl}/movie/upcoming?api_key=${constants.api_key}`).then(response => response.json());
            const genres = await fetch(constants.genreUrl).then(response => response.json())

            let popularMovies = []
            for (let i = 0; i < 5; i++) {
                popularMovies[i] = response.results[i]
                popularMovies[i].image = constants.imageUrl + response.results[i].poster_path
                popularMovies[i].genre = ''
                popularMovies[i].genre = getGenres(popularMovies[i], genres)
            }
            
            for (let i = 0; i < popularMovies.length; i++) {
                try {
                    popularMovies[i].video = getTrailer(popularMovies[i])
                } catch (error) {
                    console.log("Popular movie video not found!")
                }
            }

            for (let i = 0; i < popularMovies.length; i++) {
                try {
                    var cast = await fetch(`${constants.baseUrl}/movie/${popularMovies[i].id}/credits?api_key=${constants.api_key}&language=en-US`).then(response => response.json())
                    popularMovies[i].cast = []
                    popularMovies[i].cast = getCast(popularMovies[i], cast)
                } catch (error) {
                    console.log('Popular movie cast fetch failed!')
                }
            }

            dispatch( {
                type: 'getPopularMovies',
                payload: popularMovies
            })
        }

	} catch(error){
        console.log('Failed to get popular movies!')
    }
}

export const getUpcomingMovies = () => {
    try {
        return async dispatch => {
            const response = await fetch(`${constants.baseUrl}/discover/movie?sort_by=popularity.desc&api_key=${constants.api_key}`).then(response => response.json())
            const genres = await fetch(constants.genreUrl).then(response => response.json())

            let upcomingMovies = []
            for (let i = 0; i < 10; i++) {
                upcomingMovies[i] = response.results[i]
                upcomingMovies[i].image = constants.imageUrl + response.results[i].poster_path
                upcomingMovies[i].genre = ''
                upcomingMovies[i].genre = getGenres(upcomingMovies[i], genres)
            }
            
            for (let i = 0; i < upcomingMovies.length; i++) {
                try {
                    upcomingMovies[i].video = getTrailer(upcomingMovies[i])
                } catch (error) {
                    console.log("Upcoming movie video not found!")
                }
            }

            for (let i = 0; i < upcomingMovies.length; i++) {
                try {
                    var cast = await fetch(`${constants.baseUrl}/movie/${upcomingMovies[i].id}/credits?api_key=${constants.api_key}&language=en-US`).then(response => response.json())
                    upcomingMovies[i].cast = []
                    upcomingMovies[i].cast = getCast(upcomingMovies[i], cast)
                } catch (error) {
                    console.log('Upcoming movie cast fetch failed!')
                }
            }

            dispatch( {
                type: 'getUpcomingMovies',
                payload: upcomingMovies
            })
        }

    } catch (error) {
        console.log('Failed to get upcoming movies!')
    }
}

export const getMoviesByReleaseYear = () => {
    try {
        return async dispatch => {
            const currentYear = new Date().getFullYear()
            const response = await fetch(`${constants.baseUrl}/discover/movie?primary_release_year=${currentYear}&api_key=${constants.api_key}`).then(response => response.json());
            const genres = await fetch(constants.genreUrl).then(response => response.json())

            let moviesByReleaseYear = []
            for (let i = 0; i < 10; i++) {
                moviesByReleaseYear[i] = response.results[i]
                moviesByReleaseYear[i].image = constants.imageUrl + response.results[i].poster_path
                moviesByReleaseYear[i].genre = ''
                moviesByReleaseYear[i].genre = getGenres(moviesByReleaseYear[i], genres)
            }
            
            for (let i = 0; i < moviesByReleaseYear.length; i++) {
                try {
                    moviesByReleaseYear[i].video = getTrailer(moviesByReleaseYear[i])
                } catch (error) {
                    console.log("Movie by release year video not found!")
                }
            }

            for (let i = 0; i < moviesByReleaseYear.length; i++) {
                try {
                    var cast = await fetch(`${constants.baseUrl}/movie/${moviesByReleaseYear[i].id}/credits?api_key=${constants.api_key}&language=en-US`).then(response => response.json())
                    moviesByReleaseYear[i].cast = []
                    moviesByReleaseYear[i].cast = getCast(moviesByReleaseYear[i], cast)
                } catch (error) {
                    console.log('Movie by release year cast fetch failed!')
                }
            }

            dispatch( {
                type: 'getMoviesByReleaseYear',
                payload: moviesByReleaseYear
            })
        }

    } catch(error){
        console.log('Failed to get movies by release year!')
    }
}

export const getPopularTvShows = () => {
    try {
        return async dispatch => {
            const response = await fetch(`${constants.baseUrl}/tv/popular?api_key=${constants.api_key}`).then(response => response.json());

            let popularTvShows = []
            for (let i = 0; i < 10; i++) {
                popularTvShows[i] = response.results[i]
                popularTvShows[i].image = constants.imageUrl + response.results[i].poster_path
                popularTvShows[i].genre = ''

                const movie = await fetch(`${constants.baseUrl}/tv/${popularTvShows[i].id}?api_key=${constants.api_key}`).then(response => response.json());
                for (let j = 0; j < movie.genres.length; j++) {
                    popularTvShows[i].genre += movie.genres[j].name + (j != movie.genres.length - 1 ? ', ' : '')
                }
            }

            for (let i = 0; i < popularTvShows.length; i++) {
                try {
                var trailer = await fetch(`${constants.baseUrl}/tv/${popularTvShows[i].id}/videos?api_key=${constants.api_key}`).then(response => response.json())
                for (let j = 0; j < trailer.results.length; j++) {
                    if (trailer.results[j].type == "Trailer") {
                        popularTvShows[i].video = trailer.results[j].key
                        break
                    }
                }
                } catch (error) {
                    console.log('Popular TV show video not found!')
                }
            }

            for (let i = 0; i < popularTvShows.length; i++) {
                try{
                    var cast = await fetch(`${constants.baseUrl}/tv/${popularTvShows[i].id}/credits?api_key=${constants.api_key}&language=en-US`).then(response => response.json())
                    popularTvShows[i].cast = []
                    popularTvShows[i].cast = getCast(popularTvShows[i], cast)
                } catch (error) {
                    console.log('Popular TV show cast fetch failed!')
                }
            }        

            dispatch( {
                type: 'getPopularTvShows',
                payload: popularTvShows
            })
    
        }
    }catch(err){
        console.log('Failed to get popular TV shows!')
    }
}

export const getSimilarMovies = (id, media_type, categoryName = '') => {
    try {
        return async dispatch => {
            const response = await fetch(`${constants.baseUrl}/${media_type == 'tv' || categoryName == 'Popular Tv Shows' ? 'tv' : 'movie'}/${id}/similar?api_key=${constants.api_key}&language=en-US&page=1`).then(response => response.json())
            // const response = await fetch(`${constants.baseUrl}/movie/${id}/similar?api_key=${constants.api_key}&language=en-US&page=1`).then(response => response.json())
            const genres = await fetch(constants.genreUrl).then(response => response.json())

            let similarMovies = []
            for (let i = 0; i < 10; i++) {
                similarMovies[i] = response.results[i]
                similarMovies[i].image = constants.imageUrl + response.results[i].poster_path
                similarMovies[i].genre = ''
                for (let j = 0; j < genres.genres.length; j++) {
                    for (let z = 0; z < genres.genres.length; z++) {
                        if (similarMovies[i].genre_ids[j] == genres.genres[z].id) {
                            similarMovies[i].genre += genres.genres[z].name + (j != similarMovies[i].genre_ids.length - 1 ? ', ' : '')
                        }
                    }
                }
            }
            
            for (let i = 0; i < similarMovies.length; i++) {
                try {
                    var trailer = await fetch(`${constants.baseUrl}/movie/${similarMovies[i].id}/videos?api_key=${constants.api_key}`).then(response => response.json())
                    for (let j = 0; j < trailer.results.length; j++) {
                        if (trailer.results[j].type == "Trailer") {
                            similarMovies[i].video = trailer.results[j].key
                            break
                        }
                    }
                } catch (error) {
                    console.log("Similar movie or TV show video not found!")
                }
            }
            
            for (let i = 0; i < similarMovies.length; i++) {
                try {
                    var cast = await fetch(`${constants.baseUrl}/movie/${similarMovies[i].id}/credits?api_key=${constants.api_key}&language=en-US`).then(response => response.json())
                    similarMovies[i].cast = []
                    similarMovies[i].cast = getCast(similarMovies[i], cast)
                } catch (error) {
                    console.log('Similar movie or TV show cast fetch failed!')
                }
            }
            
            dispatch( {
                type: 'getSimilarMovies',
                payload: similarMovies
            })
        }
    } catch (error) {
        console.log('Failed to get similar movies or TV shows!')
    }
}

export const searchMovie = (keyword) => {
    try {
        return async dispatch => {
            const getMovie = await fetch(`${constants.baseUrl}/search/multi?api_key=${constants.api_key}&query=${keyword}`).then(response => response.json())
            const genres = await fetch(constants.genreUrl).then(response => response.json())
            
            let searchResult = getMovie.results
            for (let i = 0; i < searchResult.length; i++) {
                if(/null$/.test(searchResult[i].poster_path)){
                    searchResult.splice(i, 1)
                    i--
                }
            }

            for (let i = 0; i < searchResult.length; i++) {
                searchResult[i].image = constants.imageUrl + searchResult[i].poster_path
                searchResult[i].genre = ''
                if (searchResult[i].media_type == 'movie'){
                    try {
                        for (let j = 0; j < genres.genres.length; j++) {
                            if (genres.genres[j].id == searchResult[i].genre_ids[0]) {
                                searchResult[i].genre = genres.genres[j].name + (j != searchResult[i].genre_ids.length - 1 ? ', ' : '')
                            }
                        }
                    } catch (error) {
                        console.log('Error while getting movie genres!')
                    }
                }else{
                    try {
                        const movie = await fetch(`${constants.baseUrl}/tv/${searchResult[i].id}?api_key=${constants.api_key}`).then(response => response.json())
                        for (let j = 0; j < movie.genres.length; j++) {
                            searchResult[i].genre += movie.genres[j].name + (j != movie.genres.length - 1 ? ', ' : '')
                        }
                    } catch (error) {
                        console.log('Error while getting TV show genres!')
                    }
                }
            }

            for (let i = 0; i < searchResult.length; i++) {
                try {
                    var trailer = await fetch(`${constants.baseUrl}/${searchResult[i].media_type == 'movie' ? 'movie' : 'tv'}/${searchResult[i].id}/videos?api_key=${constants.api_key}`).then(response => response.json())
                    for (let j = 0; j < trailer.results.length; j++) {
                        if (trailer.results[j].type == "Trailer") {
                            searchResult[i].video = trailer.results[j].key
                            break
                        }
                    }
                } catch (error) {
                    console.log("Requested movie video not found!")
                }
            }

            try {
                for (let i = 0; i < searchResult.length; i++) {
                    var cast = await fetch(`${constants.baseUrl}/${searchResult[i].media_type == 'movie' ? 'movie' : 'tv'}/${searchResult[i].id}/credits?api_key=${constants.api_key}&language=en-US`).then(response => response.json())
                    searchResult[i].cast = []
                    for (let j = 0; j < 15; j++) {
                        searchResult[i].cast[j] = cast.cast[j]
                        if (searchResult[i].cast[j].profile_path == null || searchResult[i].cast[j].profile_path == undefined) {
                            searchResult[i].cast[j].profile_path = constants.imageNotAvailable
                        } else {
                            searchResult[i].cast[j].profile_path = constants.imageUrl + searchResult[i].cast[j].profile_path
                        }
                    }
                }
            } catch (error) {
                console.log('Requested movie cast fetch failed!')
            }
            
            dispatch( {
                type: 'search',
                payload: searchResult
            })
        }
    } catch(error){
        console.log('Failed to get requested movie or TV show!')
    }
}

export const clearSearchResult = () => {
    return { type: 'clearSearchResult' }
}

const getGenres = (movie, genres) => {
    for (let j = 0; j < genres.genres.length; j++) {
        for (let z = 0; z < genres.genres.length; z++) {
            if (movie.genre_ids[j] == genres.genres[z].id) {
                movie.genre += genres.genres[z].name + (j != movie.genre_ids.length - 1 ? ', ' : '')
            }
        }
    }
    return movie.genre
}

const getTrailer = async (movie) => {
    var trailer = await fetch(`${constants.baseUrl}/movie/${movie.id}/videos?api_key=${constants.api_key}`).then(response => response.json())
    for (let j = 0; j < trailer.results.length; j++) {
        if (trailer.results[j].type == "Trailer") {
            movie.video = trailer.results[j].key
            break
        }
    }
    return movie.video
}

const getCast = (movie, cast) => {
    for (let j = 0; j < 15; j++) {
        movie.cast[j] = cast.cast[j]
        if (movie.cast[j].profile_path == null || movie.cast[j].profile_path == undefined) {
            movie.cast[j].profile_path = constants.imageNotAvailable
        } else {
            movie.cast[j].profile_path = constants.imageUrl + movie.cast[j].profile_path
        }
    }
    return movie.cast[j]
}
