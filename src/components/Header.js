import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { SvgCssUri } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons'; 


const Header = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row', borderBottomColor: 'lightgrey', borderBottomWidth: '0.2'}}>
            <SvgCssUri
                style={styles.logo}
                uri="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            />

            <View style={styles.search}>
                <TouchableOpacity style={{padding: 10}} onPress={() => navigation.navigate('Search', { navigation })}>
                    <AntDesign name="search1" size={30} color="lightgrey"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo:{
        height: 70, 
        width: 70,
        marginHorizontal: 15
    },
    search:{
        alignSelf: 'center',
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 10
    }
})

export default Header
