import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import MovieCard from '../components/MovieCard';
import { searchMovie, clearSearchResult } from '../actions'

const SearchScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { searchResult } = useSelector((state) => state.movieReducer);
    const [keyword, setKeyword] = useState('')
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)

    return (
    <>
        <SafeAreaView style={{backgroundColor: '#2D6176', height: '100%'}}>
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
                    <TouchableOpacity onPress={() => {
                            setShowActivityIndicator(true)
                            dispatch(clearSearchResult())
                            dispatch(searchMovie(keyword))
                        }
                    }>
                        <AntDesign name="search1" size={35} color="lightgrey" />
                    </TouchableOpacity>
                </View>

                {
                    searchResult.length == 0 && showActivityIndicator && keyword.length != 0
                    ? <ActivityIndicator size={'large'} color={'lightgrey'} style={{flex:1}}/>
                    :<FlatList
                        style={{ alignSelf: 'center' }}
                        numColumns={'2'}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={() => Math.random() * 10}
                        data={searchResult}
                        renderItem={({item}) => 
                            <MovieCard
                                navigation={navigation}
                                id={item.id && item.id}
                                title={item.title ? item.title : item.name}
                                imageUri={/undefined$/.test(item.image) ? 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg' : item.image}
                                genre={item.genre && item.genre}
                                released={item.release_date && item.release_date}
                                type={item.type && item.type}
                                description={item.overview && item.overview}
                                imdbID={item.imdbID && item.imdbID}
                                imdbRating={item.vote_average && item.vote_average}
                                video={item.video && item.video}
                                cast={item.cast && item.cast}
                                media_type={item.media_type}
                            />
                        }
                    />
                }
        </SafeAreaView>
    </>
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


