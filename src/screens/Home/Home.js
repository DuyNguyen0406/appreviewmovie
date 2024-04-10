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
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from './ home.slice';


const Home = () => {
    const dispatch = useDispatch()
    const { postList, loading } = useSelector(state => state.home)
    // console.log('loading', loading)
    const navigation = useNavigation();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isEndListLoading, setIsEndListLoading] = useState(false);
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

    useEffect(() => {
        dispatch(getData(1))
    }, [])
    const handleLoadMore = () => {
        setIsEndListLoading(true); // Bắt đầu hiển thị loading indicator

        // Delay 5 giây trước khi gọi API
        setTimeout(() => {
            setCurrentPage(currentPage + 1);
            dispatch(getData(currentPage + 1)).then(() => {
                setIsEndListLoading(false); // Ẩn loading indicator khi gọi API thành công
            });
        }, 5000); // 5000 miligiây = 5 giây
    };

    const handleRefresh = () => {
        setIsRefreshing(true); // Bắt đầu refresh
        setCurrentPage(1); // Reset lại trang về 1 khi refresh
        dispatch(getData(1)).then(() => setIsRefreshing(false)); // Gọi API cho trang 1 và kết thúc refresh khi hoàn thành
    };
    useEffect(() => {
        setMovies(postList)
        // console.log('vo day')
    }, [postList])
    const handlePress = (item) => {
        // Điều hướng đến màn hình chi tiết và truyền dữ liệu qua navigation params
        navigation.navigate('Detail', { item });
    };
    const renderItem = ({ item }) => (

        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200/${item.poster_path}` }}
                style={styles.poster}
            />
        </TouchableOpacity>
    );
    const goToUserScreen = () => {
        navigation.navigate('User');
      };
      const goToNotifiScreen = () => {
        navigation.navigate('notification');
      };
    


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={goToUserScreen}>
                        <Image source={require('../../utils/user.png')} style={styles.buttonImage} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Duy Nguyen</Text>
                        <Text>viD:8888888</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.buttonHeaderRight} onPress={goToUserScreen}>
                        <Image source={require('../../utils/user.png')} style={styles.buttonHeader} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonHeaderRight} onPress={goToNotifiScreen}>
                        <Image source={require('../../utils/notification.png')} style={styles.buttonHeader} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ width: '90%', height: 40, backgroundColor: 'white', marginHorizontal: 20, flexDirection: 'row', borderRadius: 10, marginTop: 10, marginBottom:10 }}>
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
            {data ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={isRefreshing}
                />
            ) : (
                loading === 'loading' ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : loading === 'idle' ? (
                    <FlatList
                        data={movies}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        ListFooterComponent={isEndListLoading && <ActivityIndicator size="large" color="#0000ff" />}
                    />
                ) : (
                    <Text>Lỗi xảy ra: {error}</Text>
                )
            )}

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

export default Home;


