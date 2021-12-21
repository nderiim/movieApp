import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import CategorieCard from './CategorieCard';

const instanceTMDB = axios.create({ method: 'GET', baseURL: 'https://api.themoviedb.org/3', params: { 'api_key': '1f8884e4f7e6ecb71748ffc3b577ee9f'} })
const currentYear = new Date().getFullYear()

const CategoriesList = ({navigation}) => {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [moviesByYear, setMoviesByYear] = useState([])
    const [popularTvShows, setPopularTvShows] = useState([])
    
    const fetchUpcomingMovies = async () => {
        //#region  
        const response = await instanceTMDB.get('/movie/upcoming?language=en-US&page=1');
        let genres = await instanceTMDB.get('/genre/movie/list');
        let fetchedUpcomingMovies = []
        for (let i = 0; i < 10; i++) {
            fetchedUpcomingMovies[i] = response.data.results[i]
            fetchedUpcomingMovies[i].image = 'https://image.tmdb.org/t/p/w500' + response.data.results[i].poster_path
            fetchedUpcomingMovies[i].genre = ''
            for (let j = 0; j < genres.data.genres.length; j++) {
                for (let z = 0; z < genres.data.genres.length; z++) {
                    if (fetchedUpcomingMovies[i].genre_ids[j] == genres.data.genres[z].id) {
                        fetchedUpcomingMovies[i].genre += genres.data.genres[z].name + (j != fetchedUpcomingMovies[i].genre_ids.length - 1 ? ', ' : '')
                    }
                }
            }
        }
        
        for (let i = 0; i < fetchedUpcomingMovies.length; i++) {
            try {
                var trailer = await instanceTMDB.get(`/movie/${fetchedUpcomingMovies[i].id}/videos`)
                for (let j = 0; j < trailer.data.results.length; j++) {
                    if (trailer.data.results[j].type == "Trailer") {
                        fetchedUpcomingMovies[i].video = trailer.data.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log("No video found!")
            }
        }
        
        for (let i = 0; i < fetchedUpcomingMovies.length; i++) {
            var cast = await instanceTMDB.get(`movie/${fetchedUpcomingMovies[i].id}/credits`)
            fetchedUpcomingMovies[i].cast = []
            for (let j = 0; j < 10; j++) {
                fetchedUpcomingMovies[i].cast[j] = cast.data.cast[j]
                if (fetchedUpcomingMovies[i].cast[j].profile_path == null) {
                    fetchedUpcomingMovies[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                } else {
                    fetchedUpcomingMovies[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + fetchedUpcomingMovies[i].cast[j].profile_path
                }
            }
        }
        setUpcomingMovies(fetchedUpcomingMovies)
        //#endregion
    }

    const fetchMoviesByReleaseYear = async () => {
        //#region
        const response = await instanceTMDB.get(`/discover/movie?primary_release_year=${currentYear}`);
        let genres = await instanceTMDB.get('/genre/movie/list');
        let fetchedMoviesByYear = []
        for (let i = 0; i < 10; i++) {
            fetchedMoviesByYear[i] = response.data.results[i]
            fetchedMoviesByYear[i].image = 'https://image.tmdb.org/t/p/w500' + response.data.results[i].poster_path
            fetchedMoviesByYear[i].genre = ''
            for (let j = 0; j < genres.data.genres.length; j++) {
                for (let z = 0; z < genres.data.genres.length; z++) {
                    if (fetchedMoviesByYear[i].genre_ids[j] == genres.data.genres[z].id) {
                        fetchedMoviesByYear[i].genre += genres.data.genres[z].name + (j != fetchedMoviesByYear[i].genre_ids.length - 1 ? ', ' : '')
                    }
                }
            }
        }
        
        for (let i = 0; i < fetchedMoviesByYear.length; i++) {
            try {
                var trailer = await instanceTMDB.get(`/movie/${fetchedMoviesByYear[i].id}/videos`)
                for (let j = 0; j < trailer.data.results.length; j++) {
                    if (trailer.data.results[j].type == "Trailer") {
                        fetchedMoviesByYear[i].video = trailer.data.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log("No video found!")
            }
        }
        
        for (let i = 0; i < fetchedMoviesByYear.length; i++) {
            var cast = await instanceTMDB.get(`movie/${fetchedMoviesByYear[i].id}/credits`)
            fetchedMoviesByYear[i].cast = []
            for (let j = 0; j < 10; j++) {
                fetchedMoviesByYear[i].cast[j] = cast.data.cast[j]
                if (fetchedMoviesByYear[i].cast[j].profile_path == null) {
                    fetchedMoviesByYear[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                } else {
                    fetchedMoviesByYear[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + fetchedMoviesByYear[i].cast[j].profile_path
                }
            }
        }
        setMoviesByYear(fetchedMoviesByYear)
        //#endregion
    }

    const fetchPopularTvShows = async () => {
        //#region
        const response = await instanceTMDB.get(`/tv/popular?language=en-US&page=1`);
        let genres = await instanceTMDB.get('/genre/movie/list'); // /tv/88329?language=en-US
        let fetchedPopularTvShows = []
        for (let i = 0; i < 10; i++) {
            fetchedPopularTvShows[i] = response.data.results[i]
            fetchedPopularTvShows[i].image = 'https://image.tmdb.org/t/p/w500' + response.data.results[i].poster_path
            fetchedPopularTvShows[i].genre = ''
            for (let j = 0; j < genres.data.genres.length; j++) {
                for (let z = 0; z < genres.data.genres.length; z++) {
                    if (fetchedPopularTvShows[i].genre_ids[j] == genres.data.genres[z].id) {
                        fetchedPopularTvShows[i].genre += genres.data.genres[z].name + (j != fetchedPopularTvShows[i].genre_ids.length - 1 ? ', ' : '')
                        console.log(genres.data.genres[z].id)
                    }
                }
            }
        }

        for (let i = 0; i < fetchedPopularTvShows.length; i++) {
            try {
            var trailer = await instanceTMDB.get(`/tv/${fetchedPopularTvShows[i].id}/videos`)
            for (let j = 0; j < trailer.data.results.length; j++) {
                    if (trailer.data.results[j].type == "Trailer") {
                        fetchedPopularTvShows[i].video = trailer.data.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log('Video fetch -> error.status_message: ' + error.status_message)
                console.log('Video fetch -> error.status_code: ' + error.status_code)
            }
        }

        for (let i = 0; i < fetchedPopularTvShows.length; i++) {
            try{
                var cast = await instanceTMDB.get(`/tv/${fetchedPopularTvShows[i].id}/credits`)
                fetchedPopularTvShows[i].cast = []
                for (let j = 0; j < 10; j++) {
                    fetchedPopularTvShows[i].cast[j] = cast.data.cast[j]
                    if (fetchedPopularTvShows[i].cast[j].profile_path == null) {
                        fetchedPopularTvShows[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                    } else {
                        fetchedPopularTvShows[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + fetchedPopularTvShows[i].cast[j].profile_path
                    }
                }
            } catch (error) {
                console.log('Cast fetch -> error.status_message: ' + error.status_message)
                console.log('Cast fetch -> error.status_code: ' + error.status_code)
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











