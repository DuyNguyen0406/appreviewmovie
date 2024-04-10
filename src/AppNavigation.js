import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/user/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from './context/UserContext';
import Home from './screens/Home/Home';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import store from './store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Detail from './screens/detail';
import User from './screens/user/User';
import notification from './screens/notifacation';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}  options={{ headerShown: false,
        tabBarIcon: () =>
          <Image source={require('./utils/list.png')} style={{ width: 30, height: 30 }} />
      }} />
    </Tab.Navigator>
  );
}

const AppNavigation = () => {



  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Đăng nhập" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="HomeTab" component={MyTabs} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="Detail" component={Detail} options={{headerBackVisible: false, headerShown: false}}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
          <Stack.Screen name="User" component={User} options={{ headerShown: false}} />
          <Stack.Screen name="notification" component={notification} options={{ headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>)

}

export default AppNavigation;