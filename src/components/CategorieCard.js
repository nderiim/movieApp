import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MovieCard from './MovieCard';

const CategorieCard = ({ navigation, movies, categoryName }) => {
    return (
        <View>
            <View style={styles.headerView}><Text style={styles.header}>{ categoryName }</Text></View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={() => Math.random() * 10}
                data={movies}
                renderItem={({item}) => 
                    <MovieCard
                        navigation={navigation}
                        id={item.id}
                        title={categoryName == 'Popular Tv Shows' ? item.name : item.title}
                        imageUri={item.image}
                        genre={item.genre}
                        released={item.release_date}
                        type={item.type}
                        description={item.overview}
                        imdbRating={item.vote_average}
                        video={item.video}
                        cast={item.cast}
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
        color: 'white'
    },
    headerView: { 
        margin: 10, 
        padding: 10, 
        paddingBottom: 5, 
        borderBottomColor: 'lightgrey', 
        borderBottomWidth: 3, 
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10
    }
})

export default CategorieCard
