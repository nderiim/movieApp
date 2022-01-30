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
        case 'fetchPopularMovies':
            return {...state, popularMovies: action.payload};
        case 'fetchUpcomingMovies':
            return {...state, upcomingMovies: action.payload};
        case 'fetchMoviesByReleaseYear':
            return {...state, moviesByReleaseYear: action.payload}
        case 'fetchPopularTvShows':
            return {...state, popularTvShows: action.payload} 
        case 'searchMovie':
            return {...state, movieResult: action.payload}    
        case 'fetchSimilarMovies':
            return {...state, similarMovies: action.payload}    
        default:
            return state;
    }
}











// const INITIAL_STATE = { 
//     popularMovies: [],
//     // upcomingMovies: [],
//     // moviesByReleaseYear: [],
//     // popularTvShows: [],
//     // movieResult: [],
//     // similarMovies: [],
// };

// export function movieReducer(state = INITIAL_STATE, action) {
//     switch(action.type) {
//         case 'fetchPopularMovies': 
//             return {
//                 popularMovies: action.payload
//             }
//         // case 'fetchUpcomingMovies':
//         //     return {
//         //         upcomingMovies: []
//         //     }
//         // case 'fetchMoviesByReleaseYear':
//         //     return {
//         //         moviesByReleaseYear: []
//         //     }
//         // case 'fetchPopularTvShows':
//         //     return {
//         //         popularTvShows: []
//         //     } 
//         // case 'searchMovie':
//         //     return {
//         //         movieResult: []
//         //     }    
//         // case 'fetchSimilarMovies':
//         //     return {
//         //         similarMovies: []
//         //     }    
//         default:
//             return state;
//     }
// }