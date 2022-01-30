const initialState = {
    popularMovies: [],
    upcomingMovies: [],
    moviesByReleaseYear: [],
    popularTvShows: [],
    movieResult: [],
    similarMovies: [],
};

export function movieReducer(state = initialState, action) {
    switch (action.type) {
        case 'getPopularMovies':
            return {...state, popularMovies: action.payload};
        case 'getUpcomingMovies':
            return {...state, upcomingMovies: action.payload};
        case 'getMoviesByReleaseYear':
            return {...state, moviesByReleaseYear: action.payload}
        case 'getPopularTvShows':
            return {...state, popularTvShows: action.payload} 
        case 'searchMovie':
            return {...state, movieResult: action.payload}    
        case 'getSimilarMovies':
            return {...state, similarMovies: action.payload}    
        default:
            return state;
    }
}
