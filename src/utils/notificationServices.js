// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { showError } from './helperFuntion';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken()
//   }
// }

// const getFcmToken =  async () => {
//     let fcmToken = await AsyncStorage.getItem('fcmToken')
//     console.log(fcmToken,'the old token')
//     if (!fcmToken){
//         try {
//             const fcmToken = await messaging().getToken();
//             if(fcmToken){
//                 console.log(fcmToken,'the new generator token')
//                 await AsyncStorage.setItem('fcmToken', fcmToken)
//             }
//         }catch (error){
//             console.log(error,"error rasied in fcmtoken")
//             showError(error.message)
//         }
//     }
// }
// export const notificationlistener = () => {
//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             "Notifiaction caused app to open from background state:",remoteMessage.notification)
//     });

//     messaging().onMessage(async remoteMessage => {
//         console.log('recived in foreground', remoteMessage)
//     })

//     messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//         if (remoteMessage) {
//             console.log('Notifiaction caused app to open from quit state', remoteMessage.notification)
//         }
//     })
// }