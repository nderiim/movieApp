import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const CastCard = ({name, character, imageUri}) => {
    return (
        <View style={{marginLeft: 4, height: 200, width: 120}}>
            <Image
                style={styles.castImage}
                source={{uri: imageUri}}
            />
            <Text style={styles.castName}>{name}</Text>
            <Text style={{textAlign: 'center', width: 120, color: 'lightgrey'}} >{character}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    castImage:{
        width: 120, 
        height: 120,
        marginBottom: 10,
        borderRadius: 100,
        borderWidth:1, 
        borderColor: 'white'
    },
    castName: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
})
export default CastCard
