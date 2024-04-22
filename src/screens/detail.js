import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ImageBackground,
    Image
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

const Detail = ({ route }) => {
    const { item } = route?.params
    const [rating, setRating] = useState(item.vote_average);
    console.log('data', item)
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(
            <Icon key={i} name="star" size={30} color="gold" style={{ margin: 5 }} />
          );
        }
    
        if (halfStar) {
          stars.push(
            <Icon key="half" name="star-half-o" size={30} color="gold" style={{ margin: 5 }} />
          );
        }
    
        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
          stars.push(
            <Icon key={fullStars + i} name="star-o" size={30} color="gray" style={{ margin: 5 }} />
          );
        }
    
        return stars;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200/${item.poster_path}` }}
                    style={styles.poster}
                />
                <Text style={styles.title}>Movie: {item.title}</Text>
                <Text style={styles.txtText}>Release date: {item.release_date}</Text>
                <Text style={styles.txtText}>OverView:{item.overview}</Text>
                <Text style={styles.txtText}>Vote count: {item.vote_count}</Text>
                <View style={{ flexDirection: 'row' }}>
                {renderStars()}
                </View>

            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        margin: 10
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10
    },
    txtText: {
        marginTop: 5
    },
    poster: {
        width: '100%',
        height: 200
    }
})


// export default Detail;
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Detail = () => {
//     const [rating, setRating] = useState(0);

//     const handleRating = (value) => {
//       setRating(value);

//     };

//     return (
//       <View style={{ flexDirection: 'row' }}>
//         <Icon name="star" size={30} color="gold" />
//       <Icon name="star" size={30} color="gold" />
//       <Icon name="star" size={30} color="gold" />
//       <Icon name="star" size={30} color="gold" />
//       <Icon name="star" size={30} color="gold" />
//       </View>
//     );
//   };
export default Detail;
