import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import CategorieCard from './CategorieCard';

const currentYear = new Date().getFullYear()

const CategoriesList = ({navigation}) => {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [moviesByYear, setMoviesByYear] = useState([])
    const [popularTvShows, setPopularTvShows] = useState([])
    
    const fetchUpcomingMovies = async () => {
        //#region   
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json());
        const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())

        let fetchedUpcomingMovies = []
        for (let i = 0; i < 10; i++) {
            fetchedUpcomingMovies[i] = response.results[i]
            fetchedUpcomingMovies[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
            fetchedUpcomingMovies[i].genre = ''
            for (let j = 0; j < genres.genres.length; j++) {
                for (let z = 0; z < genres.genres.length; z++) {
                    if (fetchedUpcomingMovies[i].genre_ids[j] == genres.genres[z].id) {
                        fetchedUpcomingMovies[i].genre += genres.genres[z].name + (j != fetchedUpcomingMovies[i].genre_ids.length - 1 ? ', ' : '')
                    }
                }
            }
        }
        
        for (let i = 0; i < fetchedUpcomingMovies.length; i++) {
            try {
                var trailer = await fetch(`https://api.themoviedb.org/3/movie/${fetchedUpcomingMovies[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                for (let j = 0; j < trailer.results.length; j++) {
                    if (trailer.results[j].type == "Trailer") {
                        fetchedUpcomingMovies[i].video = trailer.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log("No video found!")
            }
        }
        
        for (let i = 0; i < fetchedUpcomingMovies.length; i++) {
            try {
                var cast = await fetch(`https://api.themoviedb.org/3/movie/${fetchedUpcomingMovies[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                fetchedUpcomingMovies[i].cast = []
                for (let j = 0; j < 10; j++) {
                    fetchedUpcomingMovies[i].cast[j] = cast.cast[j]
                    if (fetchedUpcomingMovies[i].cast[j].profile_path == null || fetchedUpcomingMovies[i].cast[j].profile_path == undefined) {
                        fetchedUpcomingMovies[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                    } else {
                        fetchedUpcomingMovies[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + fetchedUpcomingMovies[i].cast[j].profile_path
                    }
                }
            } catch (error) {
                console.log('Cast fetch failed!')
            }
            
        }

        setUpcomingMovies(fetchedUpcomingMovies)
        //#endregion
    }
    
    const fetchMoviesByReleaseYear = async () => {
        //#region
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${currentYear}&api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json());
        const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())

        let fetchedMoviesByYear = []
        for (let i = 0; i < 10; i++) {
            fetchedMoviesByYear[i] = response.results[i]
            fetchedMoviesByYear[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
            fetchedMoviesByYear[i].genre = ''
            for (let j = 0; j < genres.genres.length; j++) {
                for (let z = 0; z < genres.genres.length; z++) {
                    if (fetchedMoviesByYear[i].genre_ids[j] == genres.genres[z].id) {
                        fetchedMoviesByYear[i].genre += genres.genres[z].name + (j != fetchedMoviesByYear[i].genre_ids.length - 1 ? ', ' : '')
                    }
                }
            }
        }
        
        for (let i = 0; i < fetchedMoviesByYear.length; i++) {
            try {
                var trailer = await fetch(`https://api.themoviedb.org/3/movie/${fetchedMoviesByYear[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                for (let j = 0; j < trailer.results.length; j++) {
                    if (trailer.results[j].type == "Trailer") {
                        fetchedMoviesByYear[i].video = trailer.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log("No video found!")
            }
        }
        
        for (let i = 0; i < fetchedMoviesByYear.length; i++) {
            try {
                var cast = await fetch(`https://api.themoviedb.org/3/movie/${fetchedMoviesByYear[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                fetchedMoviesByYear[i].cast = []
                for (let j = 0; j < 10; j++) {
                    fetchedMoviesByYear[i].cast[j] = cast.cast[j]
                    if (fetchedMoviesByYear[i].cast[j].profile_path == null || fetchedMoviesByYear[i].cast[j].profile_path == undefined) {
                        fetchedMoviesByYear[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                    } else {
                        fetchedMoviesByYear[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + fetchedMoviesByYear[i].cast[j].profile_path
                    }
                }
            } catch (error) {
                console.log('Cast fetch failed!')
            }
        }
        setMoviesByYear(fetchedMoviesByYear)
        //#endregion
    }

    const fetchPopularTvShows = async () => {
        //#region
        const response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json());

        let fetchedPopularTvShows = []
        for (let i = 0; i < 10; i++) {
            fetchedPopularTvShows[i] = response.results[i]
            fetchedPopularTvShows[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
            fetchedPopularTvShows[i].genre = ''

            const movie = await fetch(`https://api.themoviedb.org/3/tv/${fetchedPopularTvShows[i].id}?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json());
            for (let j = 0; j < movie.genres.length; j++) {
                fetchedPopularTvShows[i].genre += movie.genres[j].name + (j != movie.genres.length - 1 ? ', ' : '')
            }
        }

        for (let i = 0; i < fetchedPopularTvShows.length; i++) {
            try {
            var trailer = await fetch(`https://api.themoviedb.org/3/tv/${fetchedPopularTvShows[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
            for (let j = 0; j < trailer.results.length; j++) {
                    if (trailer.results[j].type == "Trailer") {
                        fetchedPopularTvShows[i].video = trailer.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log('Video fetch -> error.status_message: ' + error.status_message)
            }
        }

        for (let i = 0; i < fetchedPopularTvShows.length; i++) {
            try{
                var cast = await fetch(`https://api.themoviedb.org/3/tv/${fetchedPopularTvShows[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                fetchedPopularTvShows[i].cast = []
                for (let j = 0; j < 10; j++) {
                    fetchedPopularTvShows[i].cast[j] = cast.cast[j]
                    if (fetchedPopularTvShows[i].cast[j].profile_path == null) {
                        fetchedPopularTvShows[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                    } else {
                        fetchedPopularTvShows[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + fetchedPopularTvShows[i].cast[j].profile_path
                    }
                }
            } catch (error) {
                console.log('Cast fetch failed!')
            }
        }        

        setPopularTvShows(fetchedPopularTvShows)
        //#endregion
    }

    useEffect(() => { 
        fetchUpcomingMovies() 
        fetchMoviesByReleaseYear()
        fetchPopularTvShows()
    }, [])

    return (
        <View>
            <CategorieCard navigation={ navigation } movies={ upcomingMovies } categoryName={'Upcoming Movies'}/>

            <CategorieCard navigation={ navigation } movies={ moviesByYear } categoryName={`${currentYear} movie releases`}/>

            <CategorieCard navigation={ navigation } movies={ popularTvShows } categoryName={'Popular Tv Shows'}/>
        </View>
    )
}



export default CategoriesList











