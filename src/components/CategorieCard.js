import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MovieCard from './MovieCard';

const CategorieCard = ({ navigation, movies, categoryName }) => {
    return (
        <View>
            <Text style={styles.header}>{categoryName}</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={() => Math.random() * 10}
                data={movies}
                renderItem={({item}) => 
                    <MovieCard
                        navigation={navigation}
                        title={item.title}
                        imageUri={item.imageUri}
                        genre={item.genre}
                        released={item.released}
                        type={item.type}
                        description={item.description}
                        imdbID={item.imdbID}
                        imdbRating={item.imdbRating}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
        marginLeft: 10
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

export default CategorieCard
