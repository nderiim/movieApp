import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

const MainPoster = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', 
            { 
                title:'Spider-Man: No Way Home',
                imageUri:'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
                genre:'Fantasy',
                released:'2021',
                description:'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
                imdbID: 634649,
                imdbRating: 'Not rated yet.',
            })}>
            <Image 
                style={{width: '100%', height: 600}}
                source={{ uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
            />
        </TouchableOpacity>
    )
}

export default MainPoster
