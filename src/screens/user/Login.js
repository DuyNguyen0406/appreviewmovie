import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, Alert, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import MyTabs from '../../AppNavigation'
import { getUser } from './user.slice';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required().min(6, 'it nhat 6 ki tu'),
});


// GoogleSignin.configure({
//   webClientId: '161252627529-81irtnai61erh50rclkujanj0pg8c59l.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
// });

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const user = useSelector(state => state.user.user)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const route = useRoute()
  const { params } = route;
  const usernameA = params?.username || 'true'

  const submit = async (checkLogin) => {
    console.log('Đăng nhập1', user)
    if (user[0]?.name === username && user[0]?.password === password) {
      Alert.alert(
        'Thông báo',
        'Bạn đã đăng nhập thành công!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeTab', MyTabs),

          },
        ],
        { cancelable: false }
      );
    } else (
      Alert.alert('Đăng nhập thất bại')
    )
  };
  useEffect(() => {
    dispatch(getUser())
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Đặt logic cần thực hiện khi màn hình được tập trung (focused) ở đây
      if (usernameA == 'true') {
        setUsername(''),
          setPassword('')
      }
      // Ví dụ: refreshData();
    });

    return unsubscribe;
  }, [navigation]);

  // const memory = useMemo(() => Math.random(), [username]);// useMemo giảm thừa thái các tính toán phức tạp, không cần thiết
  // console.log(memory)
  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const {idToken} = await GoogleSignin.signIn();
  //     const googleCredentials = GoogleAuthProvider.credential(idToken)
  //     await signInWithCredential(googleCredentials)
  //   } catch (error) {
  //     console.log('error',error.message)
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60, marginBottom: 60 }}>
        <Text style={{ fontSize: 50, color: '#008DDA' }}>
          MOVIE
        </Text>
      </View>
      <View style={{ backgroundColor: '#008DDA', margin: 10, borderRadius: 10 }}>
        <View style={{ marginTop: 20 }}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#008DDA"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 10, padding: 8, borderRadius: 10, backgroundColor: 'white' }} />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#008DDA"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 10, padding: 8, borderRadius: 10, backgroundColor: 'white' }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 120 }}>
          <TouchableOpacity onPress={submit} style={{ backgroundColor: 'white', height: 40, width: '40%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 35 }}>
            <Text style={{ fontSize: 18, color: '#008DDA' }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', height: 120 }}>
          <TouchableOpacity onPress={signIn} style={{ backgroundColor: 'white', height: 40, width: '40%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 35 }}>
            <Text style={{ fontSize: 18, color: '#008DDA' }}>
              Google Sign In
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};


export default Login;
