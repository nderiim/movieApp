import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const MainMovies = ({ navigation, movies }) => {
    const movieImages = movies.map(element => { return element.image });

    return (
        <SliderBox 
            images={movieImages}
            sliderBoxHeight={550}
            onCurrentImagePressed={index => navigation.push('MovieDetails', 
                { 
                    id:movies[index].id,
                    title:movies[index].title,
                    imageUri:movies[index].image,
                    genre:movies[index].genre,
                    released:movies[index].release_date,
                    description:movies[index].overview,
                    imdbID:movies[index].id,
                    imdbRating:movies[index].vote_average,
                    video:movies[index].video,
                    cast:movies[index].cast
                } 
            )}
            dotStyle={{width: 10, height: 10}}
        />
    )
}

export default MainMovies
