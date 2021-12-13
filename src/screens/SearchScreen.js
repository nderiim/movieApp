import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import MovieCard from '../components/MovieCard';
import { movies } from '../movies';

const SearchScreen = ({ navigation }) => {
    const [keyword, setKeyword] = useState('')
    const [clicked, setClicked] = useState(false)

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#2D6176'}}>
        
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
                <TouchableOpacity onPress={() => setClicked(!clicked)}>
                    <AntDesign name="search1" size={35} color="lightgrey" />
                </TouchableOpacity>
            </View>

            {clicked &&
                <FlatList
                    numColumns={'3'}
                    showsVerticalScrollIndicator={false}
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
            }

            <View style={{marginBottom: 20}}/>
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
    }
})

export default SearchScreen


