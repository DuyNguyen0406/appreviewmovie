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



const notification = () => {
    const [data, setData] = useState('')
    const [keyword, setKeyword] = useState()

    const filterItemName = () => {
        const filteredData = movies.filter((item) => item.title.includes(keyword))
        setData(filteredData)
        console.log('search', filteredData)
    }
    useEffect(() => {
        if (keyword === '') {
            setData(movies)
        }
    }, [keyword])


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '90%', height: 40, backgroundColor: 'white', marginHorizontal: 20, flexDirection: 'row', borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TextInput
                        value={keyword}
                        onChangeText={text => setKeyword(text)}
                        style={{ height: 100 }}
                        placeholder='Tìm kiếm'
                    />
                </View>
                <View style={{ flex: 0.2, backgroundColor: '#008DDA', justifyContent: 'center', borderRadius: 10 }}>
                    <TouchableOpacity onPress={filterItemName}>
                        <Text>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center', flex:1}}>
                <Text style={{fontSize:20, fontWeight:'400'}}>
                    Hiện chưa có thông báo!
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
    },
    buttonImage: {
        width: 40, // Adjust the width and height according to your image dimensions
        height: 40,
        marginRight: 5, // Adjust margin as needed
    },
    buttonHeader: {
        width: 30,
        height: 30,
    },
    buttonHeaderRight: {
        justifyContent: 'center',
        marginRight: 7
    },
    poster: {
        width: '100%',
        height: 200,
        marginRight: 10,
    },
    item: {
        width: '100%',
        height: 240,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20
    }

});

export default notification;


