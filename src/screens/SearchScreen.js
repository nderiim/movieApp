import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

const SearchScreen = ({ navigation }) => {
    const [keyword, setKeyword] = useState('')
    const [clicked, setClicked] = useState(false)

    const movies = () => {
        return (
            <View style={{flexDirection: 'row', marginBottom: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '1', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.imageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '2', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.imageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '3', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.imageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={{backgroundColor: '#2D6176'}}>
        
            <View style={styles.searchContainer}>

                <TextInput
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    value={keyword}
                    style={styles.input} 
                    onChangeText={setKeyword}
                    placeholder='Search Movie'
                    placeholderTextColor='white'
                />

                <TouchableOpacity onPress={() => setClicked(true)}>
                    <AntDesign name="search1" size={35} color="lightgrey" />
                </TouchableOpacity>
                
            </View>

                {clicked && movies()}
                {clicked && movies()}
                {clicked && movies()}
                
        </ScrollView>           
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 15,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    input: {
        flex: 1,
        padding: 15,
        color: 'lightgrey',
        fontSize: 18
    },
    imageStyle: {
        width: 115,
        height: 235,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgrey'
    }
})

export default SearchScreen


